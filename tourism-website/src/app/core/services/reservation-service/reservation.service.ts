import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../entities/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseURL = "http://localhost:8000";

  constructor(private httpClient: HttpClient) { }

  getCsrfToken(): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'csrftoken') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  createReservation(reservation: Reservation): Observable<string> {
    console.log(`${this.baseURL}/create_reservation/`);
    return this.httpClient.post<string>(`${this.baseURL}/create_reservation/`, reservation);
  }

  setReserved(location: string): Observable<string> {
    return this.httpClient.put<string>(`${this.baseURL}/reserve/${location}/`, {});
  }

  getReservationByLocation(location: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/reservations_location/${location}`);
  }

  getReservationEntitiesByLocation(location: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/reservations_by_location2/${location}`);
  }


}
