import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SubscriptionService } from '..//../../Services/subscription.service';
import { Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-my-sub',
  templateUrl: './my-sub.component.html',
  styleUrl: './my-sub.component.css'
})
export class MySubComponent {
  subscriptionData: any;
  hasSubscriptionData: boolean = false;
  quantity: number = 5;
  fromSubscription: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fromSubscription = params['fromSubscription'] === 'true';
      if (this.fromSubscription) {
        this.subscriptionData = this.subscriptionService.getSubscriptionData();
        this.hasSubscriptionData = !!this.subscriptionData;
      }
    });

    if (!this.fromSubscription) {
      // Logic to display static template if not coming from SubscriptionComponent
      this.subscriptionData = null;
      this.hasSubscriptionData = false;
    }
  }
  goBack(): void {
    this.router.navigate(['/subscription']);
  }
}