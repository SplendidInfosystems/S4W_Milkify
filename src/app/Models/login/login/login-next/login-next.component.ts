import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../Services/login.service';

@Component({
  selector: 'app-login-next',
  templateUrl: './login-next.component.html',
  styleUrls: ['./login-next.component.css']
})
export class LoginNextComponent implements OnInit {
  mobileNumber: string ='';
  otp: string = ''; 
  otpSent: boolean = false;
  responseData: any = null;
  otpVerified: boolean = false;
  otpVerificationFailed: boolean = false;
  showResendOption: boolean = false;
  showVerifyButton: boolean = true;
  remainingTime: number = 40;
  countdownInterval: any;
  showModal: boolean = false;
  enteredOtpDigits: number = 0;
  modalMessage: string = '';
  isOtpFieldEmpty: boolean = true;
  showCancellationPopup: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    // this.mobileNumber = this.loginService.getMobileNumber();
    this.startCountdownTimer();
  }

  closeCancellationPopup(): void {
    this.showCancellationPopup = false;
    this.router.navigate([], {
      queryParams: { subscriptionCancelled: null },
      queryParamsHandling: 'merge'
    });
  }

  goBack(): void {
    this.showCancellationPopup = true;
  }

  sendOTP(): void {
    if (!this.mobileNumber || !this.otp || this.otp.length !== 6) {
      console.error('Mobile number or OTP is empty.');
      return;
    }

    console.log('Sending OTP for mobile number:', this.mobileNumber);

    const Data = {
      mobile_number: this.mobileNumber,
      otp_code: this.otp
    };

    this.loginService.postLogin(this.mobileNumber, this.otp).subscribe(
      (response: any) => {
        if (response) {
          console.log('OTP sent successfully:', response);
          this.otpSent = true;
          this.router.navigate(['/home']);
        } else {
          console.error('OTP sending failed. Response:', response);
        }
      },
      (error: any) => {
        console.error('Error:', error);
        if (error.error && error.error.message) {
          console.error('Error Message:', error.error.message);
        } else {
          console.error('Unknown error occurred.');
        }
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  resend(): void {
    this.remainingTime = 40; 
    this.startCountdownTimer();
    this.showVerifyButton = true;
    this.showResendOption = false;
    this.enteredOtpDigits = 0; 
  }

  startCountdownTimer(): void {
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
        this.showVerifyButton = false;
        this.showResendOption = true;
      }
    }, 1000);
  }

  moveToNext(currentInput: HTMLInputElement, nextInput?: HTMLInputElement) {
    const length = currentInput.value.length;
    if (length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  moveToPrevious(event: KeyboardEvent, currentInput: HTMLInputElement, previousInput?: HTMLInputElement) {
    if (event.key === 'Backspace' && currentInput.value.length === 0) {
      event.preventDefault();
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  onOtpInput(inputIndex: number, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (inputValue) {
      this.enteredOtpDigits = inputIndex + 1; // Increment entered digits count
    } else {
      this.enteredOtpDigits = inputIndex; // Decrement entered digits count if input is cleared
    }
  }
  
}
