import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'https://udxjxutmi1.execute-api.us-east-1.amazonaws.com/devStage/getUser';
  private apiKey = 'gR7WQGPkVv8YqS1DTOiur56eZpr1e1T16rDe8Fx1';

  private postApiUrl = 'https://zoifx73le7.execute-api.us-east-1.amazonaws.com/devStage/postUser';
  private postApiKey = 'Vk6awMmhEGaAWKMv3NDGS8qv15JR6Dd27Ntq4amq';

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}?user_id=${userId}`;
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<any>(url, { headers });
  }

  postUser(userData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-api-key', this.postApiKey); 
    return this.http.post<any>(this.postApiUrl, userData, { headers });
  }

}
