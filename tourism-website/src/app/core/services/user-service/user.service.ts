import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../entities/User';
import { LoginResponse } from '../../entities/LoginResponse';
import { LoginDTO } from '../../entities/LoginDTO';
import { RegisterDTO } from '../../entities/RegisterDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  login(dto: LoginDTO): Observable<LoginResponse> {
    const csrfToken = this.getCsrfToken();
    const headers = csrfToken ? new HttpHeaders({ 'X-CSRFToken': csrfToken }) : undefined;

    return this.httpClient.post<LoginResponse>(`${this.baseURL}/login/`, dto, { headers });
  }

  register(dto: RegisterDTO): Observable<LoginResponse> {
    const csrfToken = this.getCsrfToken();
    const headers = csrfToken ? new HttpHeaders({ 'X-CSRFToken': csrfToken }) : undefined;

    return this.httpClient.post<LoginResponse>(`${this.baseURL}/create_user/`, dto, { headers });
  }

  setLocalStorage(response: LoginResponse) {
    localStorage.setItem('username', response.username);
    localStorage.setItem('is_superuser', response.is_superuser.toString());
  }
}
