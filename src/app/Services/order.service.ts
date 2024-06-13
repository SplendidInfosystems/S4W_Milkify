import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://1rg7pl6gzl.execute-api.us-east-1.amazonaws.com/devStage/getOrders';
  private apiKey = 'C7U5LGiBsg1cFusFdOkcv3owxhf2fk849nBlkPHW';

  constructor(private http: HttpClient) { }

  getOrders(userId: number): Observable<any> {
    const url = `${this.apiUrl}?user_id=${userId}`;
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<any>(url, { headers });
  }
}
