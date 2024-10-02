import { Component, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog/reservation-dialog.component';
import { Destination } from 'src/app/core/entities/Destination';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent {

  constructor(public dialog: MatDialog) {

  }

  @Input() destination: any;

  verifyIfLoggedIn() {
    const username = localStorage.getItem('username');
    if (username !== null) {
      return true;
    }
    else return false;
  }

  isAdmin() {
    const role = localStorage.getItem('is_superuser');
    if (role == "true") {
      console.log("A");
      return true;
    }
    console.log("B");
    return false;
  }

  openDialog(destination: Destination): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: { destination },
      autoFocus: false,
      disableClose: false
    });
  }
}

