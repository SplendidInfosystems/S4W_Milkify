import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferService {

  private apiUrl = 'https://sm249x8t48.execute-api.us-east-1.amazonaws.com/devStage/getReferral';
  private apiKey = 'nHVeqALEX3AEIO0Oh4RYaVetk4OYFjF7mjthoZ16';

  constructor(private http: HttpClient) { }

  getReferral(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<any>(`${this.apiUrl}?user_id=${userId}`, { headers: headers });
  }
}
