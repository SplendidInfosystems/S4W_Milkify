import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    this.location.back();
  }

  goToProductDetails() {
    this.router.navigate(['/home']); // Navigate to Product Details page
  }

  navigateToWallet() {
    // Set a flag indicating that the user came from the transaction page
    localStorage.setItem('fromTransactionPage', 'true');
    this.router.navigate(['/wallet']);
  }
}
