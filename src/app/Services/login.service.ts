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

  verifyOTP(otpData: any): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);

    const body = { body: [otpData] };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
  
}
