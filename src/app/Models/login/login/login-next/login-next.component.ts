import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../Services/login.service';
@Component({
  selector: 'app-login-next',
  templateUrl: './login-next.component.html',
  styleUrls: ['./login-next.component.css']
})
export class LoginNextComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  mobileNumber: string = '';
  otp: string = '123456';
  otpVerified: boolean = false;
  otpVerificationFailed: boolean = false;
  showResendOption: boolean = false;
  showVerifyButton: boolean = true;
  remainingTime: number = 40;
  countdownInterval: any;
  showModal: boolean = false;
  modalMessage: string = '';
  isOtpFieldEmpty: boolean = true;
  showCancellationPopup: boolean = false;
  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
    this.mobileNumber = this.loginService.getMobileNumber();
    this.startCountdownTimer();
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
  onOtpInput(index: number): void {
    const otpInputArray = this.otpInputs.toArray();
    const currentInput = otpInputArray[index].nativeElement;
    if (currentInput.value.length === 1 && index < otpInputArray.length - 1) {
      otpInputArray[index + 1].nativeElement.focus();
    }
    this.checkOtpFieldStatus();
  }
  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const otpInputArray = this.otpInputs.toArray();
    const currentInput = otpInputArray[index].nativeElement;
    if (event.key === 'Backspace' && currentInput.value.length === 0 && index > 0) {
      otpInputArray[index - 1].nativeElement.focus();
    }
    this.checkOtpFieldStatus();
  }
  checkOtpFieldStatus(): void {
    const enteredOtp = this.otpInputs.toArray().map(input => input.nativeElement.value).join('');
    this.isOtpFieldEmpty = enteredOtp.trim().length !== 6;
  }
  verifyOTP(): void {
    const enteredOtp = this.otpInputs.toArray().map(input => input.nativeElement.value).join('');
    if (enteredOtp === this.otp) {
      this.otpVerified = true;
      this.router.navigate(['/home']);
    } else {
      this.otpVerified = false;
      this.otpVerificationFailed = true;
      this.modalMessage = 'OTP Verification failed for this mobile number';
      this.showModal = true;
    }
  }
  closeModal(): void {
    this.showModal = false;
  }
  resend(): void {
    this.remainingTime = 40;
    this.startCountdownTimer();
    this.showResendOption = false;
    this.showVerifyButton = true;
  }
  startCountdownTimer(): void {
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
        this.showResendOption = true;
        this.showVerifyButton = false;
      }
    }, 1000);
  }
}