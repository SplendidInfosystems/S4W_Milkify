import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  otpVerificationFailed: any;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private router: Router, private modalService: NgbModal) { }


  ngOnInit(): void {
  }
  openPopup(content: any) {
    this.modalService.open(content, { centered: true });
  }


  sendOTP(): void {
    if (!this.isValidMobileNumber(this.mobileNumber)) {
      alert('Please enter a valid mobile number.');
      return;
    }

    const isRegistered = this.isMobileNumberRegistered(this.mobileNumber);

    if (!isRegistered) {
      this.router.navigate(['/registration']);
      return;
    }

    this.otpSent = true;
    console.log('OTP sent to:', this.mobileNumber);

    // Navigate to the next page with the mobile number
    this.router.navigate(['/login-next'], { queryParams: { mobileNumber: this.mobileNumber } });
  }

  isMobileNumberRegistered(mobileNumber: string): boolean {
    return mobileNumber !== '';
  }

  verifyOTP(): void {
    if (this.otp === '123456') {
      this.otpVerified = true;
      console.log('OTP verified successfully.');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid OTP. Please try again.');
      this.otpVerified = false;
    }
  }

  private isValidMobileNumber(number: string): boolean {
    return /^\d{10}$/.test(number);
  }

  resendOTP(): void {
    // Resend OTP logic...
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

  navigateToNextPage() {
    this.router.navigate(['/login-next']);
  }
}
