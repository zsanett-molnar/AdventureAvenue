# views.py
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Destination, Reservation
from .serializers import DestinationSerializer, ReservationSerializer, StatisticsSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncMonth
import json

@api_view(['GET'])
def get_simple_destinations(request):
    if request.method == 'GET':
        destinations = Destination.objects.filter(promotionPercentage=0)
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def get_promotions(request):
    if request.method == 'GET':
        destinations = Destination.objects.filter(promotionPercentage__gt=0)
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def get_all_destinations(request):
    if request.method == 'GET':
        destinations = Destination.objects.all()  # Get all destinations
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def get_available_destinations(request):
    if request.method == 'GET':
        destinations = Destination.objects.filter(isReserved=False)
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def get_reserved_destinations(request):
    if request.method == 'GET':
        destinations = Destination.objects.filter(isReserved=True)
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email, is_superuser=False)
        return Response({'username': user.username, 'is_superuser': user.is_superuser}, status=status.HTTP_201_CREATED)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            response_data = {
                'username': user.username,
                'is_superuser': user.is_superuser,
            }
            return JsonResponse(response_data)
        else:
            return JsonResponse({'error': 'Invalid username or password.'}, status=400)

@api_view(['POST'])
def create_reservation(request):
    if request.method == 'POST':
        destination_id = request.data.get('destination')
        username = request.data.get('reservedBy')

        destination = Destination.objects.get(pk=destination_id)
        if not destination:
            return Response({'message': 'ERROR'}, status=status.HTTP_400_BAD_REQUEST)

        destination.numberOfPeople -= request.data['numberOfPeople']
        if(destination.numberOfPeople == 0):
            destination.isReserved = True
        destination.save()
        print(destination.numberOfPeople)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message': 'ERROR'}, status=status.HTTP_400_BAD_REQUEST)

        reservation_date = timezone.now().date()

        reservation = Reservation.objects.create(
            destination=destination,
            startDate=request.data.get('startDate'),
            endDate=request.data.get('endDate'),
            numberOfPeople=request.data.get('numberOfPeople'),
            totalCost=request.data.get('totalCost'),
            reservedBy=user,
            reservationDate=reservation_date
        )

        print("Reseration made: ", reservation);

        if reservation:
            return Response({'message': 'OK'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'ERROR'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def reservations_by_location(request, location):
    destinations = Destination.objects.filter(location=location)
    reservations = Reservation.objects.filter(destination__in=destinations)

    print("dest ", reservations)
    reservation_stats = reservations.annotate(
        month=TruncMonth('startDate')
    ).values(
        'month'
    ).annotate(
        number_of_reservations=Count('id')
    ).order_by('month')

    data = []
    for stat in reservation_stats:
        month_start = stat['month']
        data.append({
            'month': month_start,
            'numberOfReservations': stat['number_of_reservations']
        })

    serializer = StatisticsSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_location_names(request):
    locations = Destination.objects.values_list('location', flat=True).distinct()
    return JsonResponse(list(locations), safe=False)

@api_view(['GET'])
def reservations_by_location2(request, location):
    reservations = Reservation.objects.filter(destination__location=location)

    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)