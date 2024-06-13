import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VacationService {
  private vacationDataSubject = new BehaviorSubject<any[]>([]);
  vacationData$ = this.vacationDataSubject.asObservable();
  constructor(private http: HttpClient) { }

  apiUrl = 'https://zow8560vee.execute-api.us-east-1.amazonaws.com/devStage/getUserVacation?user_id=10';
  apiKey = 'eCIlKtju013KB8RsLkEbtaUPCwRTbIdC4LfTaJ5m';


  PostapiUrl = 'https://51ozags3h2.execute-api.us-east-1.amazonaws.com/devStage/postUserVacation';
  PostapiKey = 'z6mGNkcr3I4WTpzLGLNeK4ODInFh5ryK9HVfsFdn';


  getVacationData(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    const url = `${this.apiUrl}?user_id=${userId}`;
    return this.http.get<any>(url, { headers });
  }

  setVacationData(data: any) {
    const currentData = this.vacationDataSubject.value;
    this.vacationDataSubject.next([...currentData, data]);
  }

  getVacationDataById(id: number) {
    const currentData = this.vacationDataSubject.value;
    return currentData[id];
  }

  updateVacationData(id: number, data: any) {
    const currentData = this.vacationDataSubject.value;
    if (currentData[id]) {
      currentData[id] = data;
      this.vacationDataSubject.next([...currentData]);
    }
  }
  addVacation(vacationData: any): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.PostapiKey);
    return this.http.post<any>(this.PostapiUrl, vacationData, { headers });
  }
  
}
