import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionData: any;
  constructor() {}
  saveSubscriptionData(data: any) {
    this.subscriptionData = data;
  }
  getSubscriptionData() {
    return this.subscriptionData;
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