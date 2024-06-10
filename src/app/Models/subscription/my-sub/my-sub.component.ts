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

        const userId = 2;
        this.subscriptionService.getSubscriptionData(userId).subscribe(data => {
          this.subscriptionData = data;
          this.hasSubscriptionData = !!this.subscriptionData;
        });
      }
    });

    if (!this.fromSubscription) {
      this.subscriptionData = null;
      this.hasSubscriptionData = false;
    }
  }
  goBack(): void {
    this.router.navigate(['/subscription']);
  }
  editSubscription(): void {
    this.subscriptionService.setEditingState(true);
    this.router.navigate(['/subscription']);
  }
}