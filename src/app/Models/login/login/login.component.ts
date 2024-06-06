import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
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
 
  goBack(): void {
    this.showCancellationPopup = true;
  }
  ngOnInit(): void { }
  sendOTP(): void {
  this.loginService.login(this.mobileNumber).subscribe(
    (response) => {
      if (response.success) {
        this.responseData = response; // Initialize responseData
        console.log(response);
        this.otpSent = true;
        this.router.navigate(['/login-next']);
      } else {
        console.log('Login failed');
      }
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}
  verifyOTP(): void {
    this.loginService.verifyOTP(this.mobileNumber, this.otp).subscribe(
      (response) => {
        if (response.success) {
          console.log('OTP verified successfully.');
          this.router.navigate(['/home']);
        } else {
          console.log('OTP verification failed');
          this.otpVerificationFailed = true;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

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
  navigateToNextPage(): void {
    this.router.navigate(['/login-next']);
  }
}