import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private vacationDataSubject = new BehaviorSubject<any[]>([]);
  vacationData$ = this.vacationDataSubject.asObservable();

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
}
