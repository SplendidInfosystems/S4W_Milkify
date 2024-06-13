import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://udxjxutmi1.execute-api.us-east-1.amazonaws.com/devStage/getUser';

  private PostapiUrl = 'https://zoifx73le7.execute-api.us-east-1.amazonaws.com/devStage/postUser';
  private PostapiKey = 'Vk6awMmhEGaAWKMv3NDGS8qv15JR6Dd27Ntq4amq'; 

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}?user_id=${userId}`;
    return this.http.get<any>(url);
  }
  postUser(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.PostapiKey);

    return this.http.post<any>(this.PostapiUrl, userData, { headers });
  }
}
