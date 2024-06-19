import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { WalletService } from '../../Services/wallet.service';

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
export class WalletComponent implements OnInit {

  currentBalance: number = 0;
  initialBalance: number = 0;
  balanceStatus: string = "";
  userId: string = '1'; 

  loading: boolean = false;
  ReBalance: number = 250;
  Balance: number = 1000;
  showErrorMessagePopup: boolean = false;
  selectedOption: string = "recharge";
  images = [];
  price: number = 1000;
  selectedAmount: number = 1000;
  totalPrice: number = this.price;
  showNamePopup: boolean = false;
  showPopup: boolean = false;
  couponCode: string = '';
  errorMessage: string = '';
  userInput: number = 1000;
  invalidCoupon: any;
  showPayButton: boolean = true;
  showInvalidCouponPopup: boolean = false;
  showCancellationPopup: boolean = false;
  coupons: any;
  walletData: any[] = [];

  constructor(private router: Router, private location: Location, private walletService: WalletService) { }

  ngOnInit(): void {
    // Load coupon data from local storage or API
    const cachedCouponData = localStorage.getItem('couponData');
    if (cachedCouponData) {
      this.coupons = JSON.parse(cachedCouponData);
    } else {
      this.getCouponData(1); // Fetch coupon data if not cached
    }
  
    // Load wallet data from local storage or API
    const cachedWalletData = localStorage.getItem('walletData');
    if (cachedWalletData) {
      this.walletData = JSON.parse(cachedWalletData);
    } else {
      this.getWallet(1); // Fetch wallet data if not cached
    }
  }
  
  getWallet(userId: number): void {
    this.loading = true;
    this.walletService.getWallet(userId).subscribe(
      (response: any) => {
        console.log('Wallet data successfully retrieved:', response.body);
        this.walletData = response.body || [];
        localStorage.setItem('walletData', JSON.stringify(this.walletData));
        this.loading = false;
      },
      (error) => {
        console.error('Error retrieving wallet data:', error);
        this.loading = false;
      }
    );
  }
  
  getCouponData(userId: number): void {
    this.loading = true;
    this.walletService.getCoupon(userId).subscribe(
      (response: any) => {
        console.log('Coupon Data:', response.body);
        this.coupons = response.body || [];
        localStorage.setItem('couponData', JSON.stringify(this.coupons));
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching coupon data:', error);
        this.loading = false;
      }
    );
  }
  
  goBack(): void {
    if (localStorage.getItem('fromTransactionPage')) {
      localStorage.removeItem('fromTransactionPage'); 
      this.router.navigate(['/transaction']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  postWallet(newBalance: number): void {
    this.walletService.postWallet(newBalance, this.userId)
      .subscribe(
        response => {
          console.log('Balance updated successfully:', response);
        },
        error => {
          console.error('Error updating balance:', error);
        }
      );
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

  proceed(): void {
    this.router.navigate(['/payment']); 
  }

  onChange() {
    if (!this.userInput || this.userInput < 1000) {
      this.showPayButton = true;
    } else {
      this.showPayButton = false;
    }
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
    this.errorMessage = ''; 
  }

  closeNamePopup(): void {
    this.showNamePopup = false;
  }

  saveName(): void {
    const coupon = this.coupons.find((coupon: { coupon_code: string; }) => coupon.coupon_code === this.couponCode);
    if (coupon) {
      console.log('Coupon code applied successfully:', coupon);
      this.selectedAmount = this.selectedAmount * 0.8; 
      this.closeNamePopup(); 
    } else {
      this.invalidCoupon = true;
      this.errorMessage = "There is no current running offer with this coupon code";
      this.showErrorMessagePopup = true;
    }
  }
  
  saveCoupon(couponData: any): void {
    this.walletService.postCoupon(couponData).subscribe(
      (response: any) => {
        console.log('Coupon data posted successfully:', response);
      },
      (error) => {
        console.error('Error posting coupon data:', error);
      }
    );
  }
  
  navigateToNextPage(): void {
    this.router.navigate(['/login-next']);
  }

  closeErrorMessagePopup() {
    this.showErrorMessagePopup = false;
  }
}
