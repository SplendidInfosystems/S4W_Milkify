import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  showCancelPopup: boolean = false;
  currentDate: Date = new Date();
  subscriptionCancelled: boolean = false;
  orders: any[] = [];
  loading: boolean = true; // Initialize loading to true

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['showCancelPopup']) {
        this.showCancelPopup = true;
      }
    });

    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      this.orders = JSON.parse(storedOrders);
      this.loading = false; // Set loading to false since we have data
    } else {
      this.getOrders(2);
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToProductDetails() {
    this.router.navigate(['/home']);
  }

  closeCancelPopup() {
    this.showCancelPopup = false;
  }

  confirmCancellation() {
    this.router.navigate(['/subscription'], { queryParams: { subscriptionCancelled: true } });
  }

  getOrders(userId: number): void {
    this.orderService.getOrders(userId)
      .subscribe(
        (response) => {
          this.orders = response.body;
          console.log('Orders:', this.orders);
          this.loading = false; 
          localStorage.setItem('orders', JSON.stringify(this.orders));
        },
        (error) => {
          console.error('Error fetching orders:', error);
          this.loading = false; 
        }
      );
  }
}
