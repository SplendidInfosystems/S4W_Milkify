import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl = 'https://4zo4ku0yte.execute-api.us-east-1.amazonaws.com/devStage/getTransaction';
  apiKey = '7WNUVozOJI3i7BRlYXqy27ZgIg14Ibe42drVAY6s';

  constructor(private http: HttpClient) { }

  getTransactionData(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key',this.apiKey);
    const url = `${this.apiUrl}?user_id=${userId}`;
    return this.http.get<any>(url, { headers });
  }
}
