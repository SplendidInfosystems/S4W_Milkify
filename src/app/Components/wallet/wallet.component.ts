import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  animations: [
    trigger('slideUpAnimation', [
      state('void', style({
        transform: 'translateY(100%)'
      })),
      transition(':enter', [
        animate('300ms ease-in', style({
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class WalletComponent {
  currentBalance: number = 0;
  ReBalance: number = 250;
  Balance: number = 1000;
  showErrorMessagePopup: boolean = false;
  selectedOption: string = "recharge";
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  price: number = 1000;
  selectedAmount: number = 1000;
  totalPrice: number = this.price;
  showNamePopup: boolean = false;
  showPopup: boolean = false;
  couponCode: string = '';
  errorMessage: string = '';
  userInput: number = 1000;
  invalidCoupon: any;
  showInvalidCouponPopup: boolean = false;
  showCancellationPopup: boolean = false;
  constructor(private router: Router) { }
  ngOnInit(): void { }
  goBack(): void {
    this.router.navigate(['/transaction']);
  }

  offerSets: any[] = [
    { cashback: '₹100', rechargeAmount: '₹500' },
    { cashback: '₹200', rechargeAmount: '₹1500' },
    { cashback: '₹300', rechargeAmount: '₹3000' },
    { cashback: '₹500', rechargeAmount: '₹5000' },
  ];
  toggleOption(option: string): void {
    this.selectedOption = option;
  }

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
  }
  payAmount(): void {
    console.log("Payment amount:", this.selectedAmount);
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

  removeSection(section: string): void {
    const element = document.querySelector(`.${section}`);
    if (element) {
      element.remove();
    }
  }
  openNamePopup(): void {
    this.showNamePopup = true;
    this.errorMessage = ''; // Reset error message when opening the popup
  }
  closeNamePopup(): void {
    this.showNamePopup = false;
  }
  saveName(): void {
    // Here you can add the logic to validate the coupon code
    if (this.couponCode !== 'valid_coupon_code') {
      this.invalidCoupon = true;
      this.errorMessage = "There is no current running offer with this coupon code";
      this.showErrorMessagePopup = true;
    } else {
      // Coupon code is valid, do something
    }
  }
  navigateToNextPage(): void {
    this.router.navigate(['/login-next']);
  }
  closeErrorMessagePopup() {
    this.showErrorMessagePopup = false;
  }
}
