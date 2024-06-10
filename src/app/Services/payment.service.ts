import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://hcxlant6xh.execute-api.us-east-1.amazonaws.com/devStage/getPayment?user_id=2';
  apiKey = 'Pe5auUhk5H2b36PRO1mB2PriwncLInK35JlQio50';

  constructor(private http: HttpClient) { }

  getpayment(userId: number): Observable<number> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<any>(`${this.apiUrl}getSubscription?user_id=${userId}`, { headers });
  }
}
