import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from 'src/app/core/entities/Destination';
import { Reservation } from 'src/app/core/entities/Reservation';
import { ReservationService } from 'src/app/core/services/reservation-service/reservation.service';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {

  peopleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedPeople: number = 1;
  totalPrice: number = 0;
  currentUser: string | null = "";
  numberOfDays: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ReservationDialogComponent>,
    private reservationService: ReservationService) {
    this.calculateTotalCost(data.destination);
    this.currentUser = localStorage.getItem('username');
    this.peopleOptions = Array.from({ length: data.destination.numberOfPeople }, (_, i) => i + 1);
  }


  makeReservation(dest: any) {
    const reservation: Reservation = {
      destination: dest.id,
      startDate: dest.startDate,
      endDate: dest.endDate,
      numberOfPeople: this.selectedPeople,
      totalCost: this.totalPrice,
      reservedBy: this.currentUser !== null ? this.currentUser : ''
    }

    this.reservationService.createReservation(reservation).subscribe(
      response => {
        alert('Reservation made successfully');
        if (reservation.numberOfPeople == dest.numberOfPeople) {
          dest.isReserved = true;
          dest.numberOfPeople = 0;
        }
        else {
          dest.numberOfPeople -= this.selectedPeople;
        }
        this.dialogRef.close();
      },
      error => {
        alert('Error making reservation');
      },

    );

  }

  calculateNumberOfDays(startDateStr: string, endDateStr: string): number {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime())) {
      throw new Error('startDate is not a valid date');
    }

    if (isNaN(endDate.getTime())) {
      throw new Error('endDate is not a valid date');
    }

    const startDay = startDate.getTime();
    const endDay = endDate.getTime();

    const differenceInMilliseconds = endDay - startDay;
    const millisecondsInADay = 1000 * 60 * 60 * 24;

    const differenceInDays = differenceInMilliseconds / millisecondsInADay;

    return differenceInDays;
  }


  calculateTotalCost(destination: any) {
    console.log("calc");
    this.numberOfDays = this.calculateNumberOfDays(destination.startDate, destination.endDate);
    if (destination.promotionPercentage > 0) {
      this.totalPrice = (destination.price - (destination.price * (destination.promotionPercentage / 100))) * this.numberOfDays * this.selectedPeople;
    }
    else {
      this.totalPrice = destination.price * this.numberOfDays * this.selectedPeople;

    }

  }



}
