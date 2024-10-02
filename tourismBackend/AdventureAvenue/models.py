from datetime import timezone
from datetime import *
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Destination(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField()
    location = models.CharField(max_length=32)
    price = models.FloatField()
    numberOfPeople = models.IntegerField()
    promotionPercentage = models.IntegerField()
    startDate = models.DateField()
    endDate = models.DateField()
    photo = models.ImageField(upload_to='destinations/')
    isReserved = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id) + ' | ' + self.name


class Reservation(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, default=None, null=True)
    startDate = models.DateField()
    endDate = models.DateField()
    numberOfPeople = models.IntegerField()
    totalCost = models.FloatField()
    reservationDate = models.DateField()
    reservedBy = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return str(self.id) + ' | ' + self.reservedBy.username



