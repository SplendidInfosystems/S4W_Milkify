import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-next',
  templateUrl: './login-next.component.html',
  styleUrls: ['./login-next.component.css']
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
  otpVerificationFailed: boolean = false;
  showResendOption: boolean = false;
  showVerifyButton: boolean = true;

  constructor(private router: Router) {
    this.startCountdownTimer();
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }

  onOtpInput(index: number): void {
    const otpInputArray = this.otpInputs.toArray();
    const currentInput = otpInputArray[index].nativeElement;
    if (currentInput.value.length === 1 && index < otpInputArray.length - 1) {
      otpInputArray[index + 1].nativeElement.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const otpInputArray = this.otpInputs.toArray();
    const currentInput = otpInputArray[index].nativeElement;
    if (event.key === 'Backspace' && currentInput.value.length === 0 && index > 0) {
      otpInputArray[index - 1].nativeElement.focus();
    }
  }

  verifyOTP(): void {
    const enteredOtp = this.otpInputs.toArray().map(input => input.nativeElement.value).join('');
    if (enteredOtp === this.otp) {
      this.otpVerified = true;
      console.log('OTP verified successfully.');
      alert('OTP verified successfully!');
      this.router.navigate(['/home']);
    } else {
      this.otpVerified = false;
      this.otpVerificationFailed = true;
      alert('Invalid OTP. Please try again.');
    }
  }

  resend(): void {
    this.remainingTime = 40;
    this.startCountdownTimer();
    this.showResendOption = false;
    this.showVerifyButton = true; // Show the "Verify & Proceed" button again after resend
    // Add logic to actually resend the OTP
  }

  startCountdownTimer(): void {
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
        this.showResendOption = true;
        this.showVerifyButton = false; // Hide the "Verify & Proceed" button when time is over
      }
    }, 1000);
  }
}
