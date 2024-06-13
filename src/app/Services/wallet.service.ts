import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrl = 'https://v066mgs3g4.execute-api.us-east-1.amazonaws.com/devStage/postWallet';
  apiKey = 'MRGJIm8gf484Vj4XTPkgF8arq7lFlrPy3IPEK57A';

  couponapiUrl = 'https://lccuykgvm8.execute-api.us-east-1.amazonaws.com/devStage/getCoupon?user_id=1';
  couponapiKey = 'd3qoj1nEC03MllYh1gk0w7hoGG3Hjyzp5ejpXWlH';

  PostcouponapiUrl = 'https://uosfv3nibb.execute-api.us-east-1.amazonaws.com/devStage/postCoupon"';
  PostcouponapiKey = 'bXiDC7CUJXa7ph2BxsmKu8mfWq6p2zZaauAMPCkP';

  constructor(private http: HttpClient) { }

  updateBalance(balance: number, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
    const body = { balance: balance.toString(), user_id: userId };
    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  getCoupon(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.couponapiKey
    });
    return this.http.get<any>(`${this.couponapiUrl}?user_id=${userId}`, { headers });
  }

  postCoupon(couponData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.PostcouponapiKey
    });
    return this.http.post(this.PostcouponapiUrl, couponData, { headers });
  }
}
