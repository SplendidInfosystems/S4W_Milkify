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
  mobile_number:any;
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
  loading: boolean = false;
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';
  get otp_code(): string {
    return this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
  }
  
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.startCountdownTimer();
  }
  

  checkOtp() {
    if (this.otp_code.length === 6) {
      console.log(this.otp_code);
    }
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

 verifyOTP(): void {
    this.loading = true;
    const otpData = {
      mobile_number: this.mobileNumber,
      otp_code: this.otp 
    };

    this.loginService.verifyOTP(otpData).subscribe(
      (response) => {
        this.loading = false;
        console.log('OTP verified successfully',response);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loading = false;
        this.otpVerificationFailed = true;
        console.error('Failed to verify OTP', error);
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

  moveToNext(currentInput: any, nextInput?: any) {
    if (currentInput.value.length === 1 && nextInput) {
      nextInput.focus();
    }
    if (!nextInput) {
      this.checkOtp();
    }
  }
  
  moveToPrevious(event: any, currentInput: any, previousInput?: any) {
    if (event.key === 'Backspace' && currentInput.value.length === 0 && previousInput) {
      previousInput.focus();
    }
  }
  

  onOtpInput(inputIndex: number, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (inputValue) {
      this.enteredOtpDigits = inputIndex + 1; 
    } else {
      this.enteredOtpDigits = inputIndex;
    }
  }
  
}
