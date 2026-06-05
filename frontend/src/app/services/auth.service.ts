import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'rem_token';
  readonly isAuthenticated = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>('/api/auth/login', payload).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
