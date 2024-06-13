import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  goBack(): void {
    this.location.back();
  }

  goToProductDetails() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['showCancelPopup']) {
        this.showCancelPopup = true;
      }
    });

    const cachedOrders = localStorage.getItem('orders');
    if (cachedOrders) {
      this.orders = JSON.parse(cachedOrders);
    } else {
      
      this.getOrders(2); 
    }
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

          localStorage.setItem('orders', JSON.stringify(this.orders));
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }
}
