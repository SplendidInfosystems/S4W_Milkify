import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  apiUrl = 'https://g07wh13jr0.execute-api.us-east-1.amazonaws.com/devStage/getMonthlyBill?user_id=1';
  apiKey = 'SsJYRrqXU9aAfVGOL8exC2ao77fJBC3r8vXFSCEK';

  constructor(private http: HttpClient) { }

  getMonthlyBill(userId: number): Observable<number> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<any>(`${this.apiUrl}getSubscription?user_id=${userId}`, { headers });
  }
}
