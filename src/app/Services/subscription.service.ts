import { Injectable } from '@angular/core';
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
}