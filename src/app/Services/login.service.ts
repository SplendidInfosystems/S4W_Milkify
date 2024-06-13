import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://4ycv4z1ckd.execute-api.us-east-1.amazonaws.com/devStage/postLogin';
  private apiKey = '50E7Ke7chw1hOh0HtR2B48MEJTMWWmVC8tkP7Ltu';

  constructor(private http: HttpClient) { }

 
  postLogin(mobileNumber: string,  otp: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    const body = {
      mobile_number: mobileNumber, otp_code: otp
    };
    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }

  verifyOTP(mobileNumber: string, otp: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    const body = { mobile_number: mobileNumber, otp_code: otp };
    return this.http.post<any>(`${this.apiUrl}verifyOTP`, body, { headers });
  }

  getMobileNumber(): string {
    const mobileNumber = localStorage.getItem('mobileNumber');
    return mobileNumber ? mobileNumber : '';
  }
}