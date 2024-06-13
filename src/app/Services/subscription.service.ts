import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  private baseUrl = 'https://95kc16p1fh.execute-api.us-east-1.amazonaws.com/devStage/getSubscription?user_id=2';
  private apiKey = 'U9iys9F1sOaZvXByFpSND8tMWVG5IgFSso8f2Yvd';

  private PostbaseUrl = 'https://ys1bhtkcf5.execute-api.us-east-1.amazonaws.com/devStage/postSubscription ';
  private PostapiKey = 'XDRv4eXn8T2VztEvjzZTw6trqn3k1E8w42xbAWcl';

  constructor(private http: HttpClient) { }

  getSubscriptionData(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);

    // Check if subscription data exists in local storage
    const cachedData = localStorage.getItem('subscriptionData');
    if (cachedData) {
      return new Observable<any>((observer) => {
        observer.next(JSON.parse(cachedData));
        observer.complete();
      });
    } else {
      return this.http.get<any>(`${this.baseUrl}getSubscription?user_id=${userId}`, { headers });
    }
  }
  postSubscriptionData(subscriptionData: any): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.PostapiKey);
    return this.http.post<any>(`${this.PostbaseUrl}postSubscription`, subscriptionData, { headers });
  }

  private subscriptionData: any;
  saveSubscriptionData(data: any) {
    this.subscriptionData = data;
  }
  
  clearSubscriptionData() {
    this.subscriptionData = null;
  }
  private editingSubject = new BehaviorSubject<boolean>(false);
  isEditing$ = this.editingSubject.asObservable();

  setEditingState(isEditing: boolean) {
    this.editingSubject.next(isEditing);
  }

}