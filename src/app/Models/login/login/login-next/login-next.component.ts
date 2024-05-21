import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-next',
  templateUrl: './login-next.component.html',
  styleUrl: './login-next.component.css'
})
export class LoginNextComponent {
  remainingTime: number = 40;
  countdownInterval: any;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  mobileNumber: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false;
  otp: string = '123456';
  resendDisabled: boolean = false;
  otpVerificationFailed: any;
  showResendOption: boolean = false;



  constructor(private router: Router) {
    this.startCountdownTimer();
  }
  onOtpInput(index: number): void {
    if (index < 6 && this.otpInputs && this.otpInputs.length > index + 1) {
      const nextInput = this.otpInputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  verifyOTP(): void {
    if (this.otp === '123456') {
      this.otpVerified = true;
      console.log('OTP verified successfully.');

      alert('OTP verified successfully!');

      this.router.navigate(['/home']);
    } else {

      this.otpVerified = false;

      alert('Invalid OTP. Please try again.');
    }
  }
 
  resend(): void {
    // Your resend logic goes here
    // This function will be called when the user clicks on the "resend" option
    // You can reset the timer and hide the "resend" option if needed
    this.remainingTime = 40;
    this.startCountdownTimer();
    this.showResendOption = false; // Hide the resend option after clicking it
  }
  startCountdownTimer(): void {
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
        // Set the flag to true when the countdown reaches zero
        this.showResendOption = true;
      }
    }, 1000);
  }

}
