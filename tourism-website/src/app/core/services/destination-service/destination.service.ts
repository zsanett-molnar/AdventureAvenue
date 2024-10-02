import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destination } from '../../entities/Destination';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private baseURL = "http://localhost:8000";

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  getAllDestinations(): Observable<Destination[]> {
    return this.httpClient.get<Destination[]>(`${this.baseURL}/destinations/`);
  }

  getPromotions(): Observable<Destination[]> {
    return this.httpClient.get<Destination[]>(`${this.baseURL}/promotions/`);
  }

  getLocations(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseURL}/get_locations/`);
  }
}
