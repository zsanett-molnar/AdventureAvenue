from rest_framework import serializers
from .models import Destination, Reservation

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class StatisticsSerializer(serializers.Serializer):
    month = serializers.DateField()
    numberOfReservations = serializers.IntegerField()

    class Meta:
        fields = ['month', 'numberOfReservations']