import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../../Services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  amountToPay: number = 250;
  cashback: number = 0;
  loading: boolean = false; // Add loading state
  toBeCredited: number = this.amountToPay;
  upiIDs: string[] = [];
  cardExpiry: string = '';
  paymentData: any[] = [];
  money:number =0;
  cardNumber: string[] = []; 

  cvv: string[] = [];
  saveCard: boolean = false; 
  showCancellationPopup: boolean = false;
  showAddCardPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  

  constructor(private router: Router, private paymentService: PaymentService) { }

  @Output() cancelConfirmed = new EventEmitter<boolean>();
  @Output() popupClosed = new EventEmitter<boolean>();

  openAddCardPopup(): void {
    this.showAddCardPopup = true;
  }
  isFormValid(): boolean {
    // Check if all required fields are filled
    if (this.cardNumber && this.cardExpiry && this.cvv) {
      return true;
    } else {
      return false;
    }
  }

  closeAddCardPopup(): void {
    this.showAddCardPopup = false;
  }

  openConfirmationPopup(): void {
    this.showConfirmationPopup = true;
  }

  closeConfirmationPopup(): void {
    this.showConfirmationPopup = false;
  }
  confirmCancel() {
    this.cancelConfirmed.emit(true);
  }

  closePopup() {
    this.popupClosed.emit(false);
  }


 
  ngOnInit(): void {
  
    const storedPaymentData = localStorage.getItem('paymentData');
    if (storedPaymentData) {
      this.paymentData = JSON.parse(storedPaymentData);
    } else {
      const userId = 1;
      this.getPaymentData(userId);
    }
  }
  addMoney(): void {
    console.log('Adding money:', this.money);
    this.router.navigate(['/success']);
  }
  getPaymentData(userId: number): void {
    this.loading = true; 
    this.paymentService.getPayment(userId).subscribe(
      (response: any) => {
        console.log('Payment Data:', response.body); 
        this.paymentData = response.body || []; 
        localStorage.setItem('paymentData', JSON.stringify(this.paymentData));
        this.loading = false; 
      },
      (error: any) => {
        console.error('Error fetching payment data:', error);
        this.loading = false; 
      }
    );
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

  addUPI(): void {
    this.upiIDs.push(''); // Add an empty string as a new UPI ID
  }

  removeUPI(index: number): void {
    this.upiIDs.splice(index, 1); // Remove the UPI ID input field at the specified index
  }

  popularItems = [
    {
      name: 'GPAY',
      image: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png',
    },
    {
      name: 'PHONEPE',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEVHcExyQqptOqdyQaqjgMjw5vePabtmMaOFWbWWccF/U7KQbLt9UrGDWbS/p9l4Sa6LZLlfJZ9dIZ7///9ZG5zs5fRPAJdiK6Hd0+pWDpqScb3QwuL49vvm3/CDW7Ovl86jiMa6pNQiGQV4AAAAEXRSTlMA4PHGKQaB+1w+o6NzsxiMmM8UagcAAAEwSURBVCiRhZLbcoQgEEQVL4C7rmFAEHHV/P9PZrhqJVuVfrAsj9NOY1dVUddyxnhbfRAfCDUoWk+/edsYAIECAUCH7s56ikRpGzjeEX6xQfin6/cBiQLty1z0e0vptEiiaZab+LZBemQK5BUS1NkLFinPQgcPWdwBZcHJbdVKRWOfKAyqffXaN6TrHih8YUKfQmh0LNoirLOrPRccWpZwdfE40PeZcuPsbKx+y9mquKFh1SPtahFS4aHKWf+ByfYDRFuWoZNy13eIC3GaNloxg8NEGQLp0iF46mLKAsf8T8LRns4dc4HG/5cXgfxZffsmNN118lG6TNLUpBEKtMfsAjTP3MnmogpiVR5XY0cBN28sRamQp4wUjJP1rXyhuH1N8TkS2rCu+iPO+mnq2a3vPzDHKbhqwKZ/AAAAAElFTkSuQmCC',
    },
  ];
}
