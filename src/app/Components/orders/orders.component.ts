import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  showCancelPopup: boolean = false;
  subscriptionCancelled: boolean = false;
  constructor(private location: Location, private router:Router,private route: ActivatedRoute) { }
  goBack(): void {
    this.location.back();
  }
  goToProductDetails() {
    this.router.navigate(['/home']); // Navigate to Product Details page
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['showCancelPopup']) {
        this.showCancelPopup = true;
      }
    });
  }
  closeCancelPopup() {
    this.showCancelPopup = false;
  }

  confirmCancellation() {
    this.router.navigate(['/subscription'], { queryParams: { subscriptionCancelled: true } });
  }
}