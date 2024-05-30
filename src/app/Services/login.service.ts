import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private mobileNumber: string = '';

  setMobileNumber(number: string): void {
    this.mobileNumber = number;
  }

  getMobileNumber(): string {
    return this.mobileNumber;
  }
  
}
