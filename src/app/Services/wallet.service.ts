import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrl = 'https://v066mgs3g4.execute-api.us-east-1.amazonaws.com/devStage/postWallet';
  apiKey = 'MRGJIm8gf484Vj4XTPkgF8arq7lFlrPy3IPEK57A';

  couponapiUrl = 'https://lccuykgvm8.execute-api.us-east-1.amazonaws.com/devStage/getCoupon?user_id=2';
  couponapiKey = 'd3qoj1nEC03MllYh1gk0w7hoGG3Hjyzp5ejpXWlH';

  postCouponapiUrl = 'https://uosfv3nibb.execute-api.us-east-1.amazonaws.com/devStage/postCoupon';
  postCouponapiKey = 'bXiDC7CUJXa7ph2BxsmKu8mfWq6p2zZaauAMPCkP';

  getWalletapiUrl = 'https://fb405yn7nh.execute-api.us-east-1.amazonaws.com/devStage/getWallet?user_id=2';
  getWalletapiKey = 'tj2zZlg1xT2vxHXDMZnbP5tNalXW21g8ayxup4vo';


  updateWalletapiUrl = 'https://hiamt7qw66.execute-api.us-east-1.amazonaws.com/devStage/updateWallet';
  updateWalletapiKey = 'qe5pwT3rFK3KX09efEat49bKqXxD3r386Kig9ppt';

  constructor(private http: HttpClient) { }

  postWallet(balance: number, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });
    const body = { balance: balance.toString(), user_id: userId };
    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  updateWallet(updatedata:any): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.updateWalletapiKey
    });
    const body = { body: [updatedata] };

    return this.http.patch(this.updateWalletapiUrl, body, { headers });
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
      'x-api-key': this.postCouponapiKey
    });
    const body = { body: [couponData] };

    return this.http.post(this.postCouponapiUrl, body, { headers });
  }

  getWallet(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.getWalletapiKey
    });
    return this.http.get<any>(`${this.getWalletapiUrl}?user_id=${userId}`, { headers });
  }
}
