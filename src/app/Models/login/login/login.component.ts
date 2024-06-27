
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  mobile_number:any;
  mobileNumber: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false;
  otp: string = '';
  resendDisabled: boolean = false;
  remainingTime: string = '';
  otpVerificationFailed: boolean = false;
  showCancellationPopup: boolean = false;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  responseData: any = null;
mobileInput: any;
mobileNumberInput: any;
  
  constructor(private router: Router, private loginService: LoginService) { }
  
  @Output() cancelConfirmed = new EventEmitter<boolean>();
  @Output() popupClosed = new EventEmitter<boolean>();
  confirmCancel() {
    this.cancelConfirmed.emit(true);
  }
  closePopup() {
    this.popupClosed.emit(false);
  }
  closeCancellationPopup() {
    this.showCancellationPopup = false;
    this.router.navigate([], {
      queryParams: {
        subscriptionCancelled: null
      },
      queryParamsHandling: 'merge'
    });
  }
  navigateToNextPage(): void {
    if (this.isValidMobileNumber(this.mobileNumber)) {
      this.router.navigate(['/login-next'], { queryParams: { mobileNumber: this.mobileNumber } });
    } else {
      // Handle invalid mobile number case if needed
    }
  }
  
  
  goBack(): void {
    this.showCancellationPopup = true;
  }
  ngOnInit(): void { }
  
  private isValidMobileNumber(number: string): boolean {
    return /^\d{10}$/.test(number);
  }
  resendOTP(): void {
    this.resendDisabled = true;
    this.startCountdownTimer(40);
  }
  startCountdownTimer(seconds: number): void {
    let timer = seconds;
    const interval = setInterval(() => {
      timer--;
      this.remainingTime = this.formatTime(timer);
      if (timer <= 0) {
        clearInterval(interval);
        this.resendDisabled = false;
        this.remainingTime = '';
      }
    }, 1000);
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}