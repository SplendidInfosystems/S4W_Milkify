import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SubscriptionService } from '..//../../Services/subscription.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-sub',
  templateUrl: './my-sub.component.html',
  styleUrl: './my-sub.component.css'
})
export class MySubComponent {
  subscriptionData: any;
  hasSubscriptionData: boolean = false;
  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}
  ngOnInit(): void {
    this.subscriptionData = this.subscriptionService.getSubscriptionData();
    this.hasSubscriptionData = !!this.subscriptionData; // Check if there is subscription data
    if (!this.subscriptionData) {
      this.router.navigate(['/subscription']); // Navigate back if no data is found
    }
  }
  goBack(): void {
    this.router.navigate(['/subscription']);
  }
}