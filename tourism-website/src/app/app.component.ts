import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tourism-website';

  constructor() {
    this.saveGeolocationToLocalStorage();
  }

  saveGeolocationToLocalStorage(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const geolocationData = { latitude, longitude };
          const geolocationJSON = JSON.stringify(geolocationData);
          localStorage.setItem('geolocation', geolocationJSON);

        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

}



