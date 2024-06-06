import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://4ycv4z1ckd.execute-api.us-east-1.amazonaws.com/devStage/postLogin';
  private apiKey = '50E7Ke7chw1hOh0HtR2B48MEJTMWWmVC8tkP7Ltu';
  private mobileNumber: string = '';

  constructor(private http: HttpClient) { }

  setMobileNumber(number: string): void {
    this.mobileNumber = number;
  }

  getMobileNumber(): string {
    return this.mobileNumber;
  }

  login(mobileNumber: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post<any>(`${this.baseUrl}postLogin`, { mobile_number: mobileNumber }, { headers });
  }

  verifyOTP(otp: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post<any>(`${this.baseUrl}verifyOTP`, { mobile_number: this.mobileNumber, otp_code: otp }, { headers });
  }
}
