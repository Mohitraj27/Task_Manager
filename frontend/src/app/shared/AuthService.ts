import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = false;

  private _token: string | null = null;

  constructor() {
    // Check if token exists in local storage upon service initialization
    const token = localStorage.getItem('token');
    if (token) {
      this._isAuthenticated = true;
      this._token = token;
    }
  }

  login(token: string) {
    // Store token in local storage
    localStorage.setItem('token', token);
    this._isAuthenticated = true;
    this._token = token;
  }

  logout() {
    localStorage.removeItem('token');
    this._isAuthenticated = false;

    this._token = null;
  }

  isAuthenticated(): boolean {
    // Check if token exists and user is authenticated

    return !!this._token && this._isAuthenticated;
  }
}
