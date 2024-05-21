import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  constructor(private location: Location , private router: Router) { }

 goBack(): void {
    this.location.back();
 }
 goToProductDetails() {
  this.router.navigate(['/home']); // Navigate to Product Details page
}
}