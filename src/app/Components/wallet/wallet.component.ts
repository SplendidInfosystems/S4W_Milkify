import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'] 
})
export class WalletComponent {
  currentBalance: number = 0;
  ReBalance: number = 250;
  Balance: number = 1000;
  selectedOption: string = ''; 
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  price: number = 1000;
  totalPrice: number = this.price; 
  showNamePopup: boolean = false;
  showPopup: boolean = false;
  couponCode: string = '1234';
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  toggleOption(option: string): void {
    this.selectedOption = option;
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
    if (this.couponCode === '1234') { 
      this.showNamePopup = false;
      this.errorMessage = ''; // Reset error message
    } else {
    
      this.errorMessage = 'There is no current running offer with this coupon code.';
    }
  }
}
