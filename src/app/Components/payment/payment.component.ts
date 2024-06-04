import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  amountToPay: number = 250;
  cashback: number = 0;
  toBeCredited: number = this.amountToPay - this.cashback;
  upiIDs: string[] = [];
  
  showCancellationPopup: boolean = false;
  constructor(private router: Router) { }
  

  @Output() cancelConfirmed = new EventEmitter<boolean>();
  @Output() popupClosed = new EventEmitter<boolean>();

  confirmCancel() {
    this.cancelConfirmed.emit(true);
  }

  closePopup() {
    this.popupClosed.emit(false);
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
      image:
        'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png',
    }, 
    {
      name: 'PHONEPE',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEVHcExyQqptOqdyQaqjgMjw5vePabtmMaOFWbWWccF/U7KQbLt9UrGDWbS/p9l4Sa6LZLlfJZ9dIZ7///9ZG5zs5fRPAJdiK6Hd0+pWDpqScb3QwuL49vvm3/CDW7Ovl86jiMa6pNQiGQV4AAAAEXRSTlMA4PHGKQaB+1w+o6NzsxiMmM8UagcAAAEwSURBVCiRhZLbcoQgEEQVL4C7rmFAEHHV/P9PZrhqJVuVfrAsj9NOY1dVUddyxnhbfRAfCDUoWk+/edsYAIECAUCH7s56ikRpGzjeEX6xQfin6/cBiQLty1z0e0vptEiiaZab+LZBemQK5BUS1NkLFinPQgcPWdwBZcHJbdVKRWOfKAyqffXaN6TrHih8YUKfQmh0LNoirLOrPRccWpZwdfE40PeZcuPsbKx+y9mquKFh1SPtahFS4aHKWf+ByfYDRFuWoZNy13eIC3GaNloxg8NEGQLp0iF46mLKAsf8T8LRns4dc4HG/5cXgfxZffsmNN118lG6TNLUpBEKtMfsAjTP3MnmogpiVR5XY0cBN28sRamQp4wUjJP1rXyhuH1N8TkS2rCu+iPO+mnq2a3vPzDHKbhqwKZ/AAAAAElFTkSuQmCC',
    }, 
  
   
  ]
}
