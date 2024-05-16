import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  startDate: Date = new Date('2024-05-10');
  defaultDate: Date;
  selectedSubscription: string = 'Daily';
  isSubscriptionTypesVisible: boolean = false;
  price: number = 53;
  quantity: number = 1; 
  totalPrice: number = this.price; 
  constructor(private router: Router) {
    this.defaultDate = new Date();
  }



  ngOnInit(): void {
    this.defaultDate = new Date();
  }
  goBack(): void {
    this.router.navigate(['/home']);
  }
  openDatePicker(): void {
  }
  openSubscriptionTypes(): void {
    this.isSubscriptionTypesVisible = true;
  }

  selectSubscription(subscription: string): void {
    this.selectedSubscription = subscription;
    this.isSubscriptionTypesVisible = false;
  }
  increaseValue(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  decreaseValue(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.price * this.quantity;
  }
}
