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
  coupons: any[] = [
    { coupon_code: "DISC10", discount_percentage: "30%" },
    { coupon_code: "RITE34", discount_percentage: "25%" },
    { coupon_code: "SPRING20", discount_percentage: "20%" }
  ];
  
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
   this.payAmount;
  }

  onClickBalance(): void {
    this.updateWallet();
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

  
  saveCoupon() {
    const couponData = {
      coupon_code: this.couponCode, 
      discount_percentage: "30%",
      expiry_date: "2024-05-31",
      user_id: "5"
    };
  console.log(couponData);
    this.walletService.postCoupon(couponData).subscribe(
      (response: any) => {
        console.log('Coupon data posted successfully:', response);
      },
      (error) => {
        console.error('Error posting coupon data:', error);
        this.errorMessage = 'Failed to apply coupon. Please try again.'; 
      }
    );
   
  }

  updateWallet(): void {
    const updatedata = {
          wallet_id: "3",
           balance: this.Balance,
           user_id: "3"
    };
    this.walletService.updateWallet(updatedata)
      .subscribe(
        response => {
          console.log('Wallet balance updated successfully:', response);
          // Optionally, update local data or handle success
        },
        error => {
          console.error('Error updating wallet balance:', error);
          // Handle error appropriately
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
