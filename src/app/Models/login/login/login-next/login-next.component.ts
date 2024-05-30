import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mobileNumber = params['mobileNumber'] || '';
    });
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
