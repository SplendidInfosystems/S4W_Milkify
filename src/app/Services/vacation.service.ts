// vacation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private vacationData = new BehaviorSubject<any>(null);
  vacationData$ = this.vacationData.asObservable();
  constructor() { }
  setVacationData(data: any) {
    this.vacationData.next(data);
  }
  getVacationData(): Observable<any> {
    return this.vacationData.asObservable();
  }
}