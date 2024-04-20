import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  //connect backend to frontend

  apiUrl = 'http://localhost:3000/user';

  // Function to set headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  createData(data: any): Observable<any> {
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUrl}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteData(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`, {
      headers: this.getHeaders(),
    });
  }

  //update data
  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.apiUrl}/${ids}`, data, {
      headers: this.getHeaders(),
    });
  }

  //getsingle data
  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`, {
      headers: this.getHeaders(),
    });
  }

  // New method for user login
  userLogin(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, data);
  }

  // New method for user registration
  userRegister(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/user/register`, data);
  }
}
