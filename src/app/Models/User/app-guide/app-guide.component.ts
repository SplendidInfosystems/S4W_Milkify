import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-guide',
  templateUrl: './app-guide.component.html',
  styleUrls: ['./app-guide.component.css'] // Note the plural here: styleUrls instead of styleUrl
})
export class AppGuideComponent {
  infoToShow: { title: string, description: string[], buttonLabel?: string, description2?: string[], buttonLabel2?: string, note?: string[] } | null = null;  showDetails: boolean = true;

  constructor(private router: Router) { }
  goBacktoCards() {
    this.infoToShow = null;
    this.showDetails = true; // Show the cards again
  }
  goBack() {
    this.router.navigate(['/need-help']);
  }

  guideOptions: string[] = [
    "Place an Order",
    "Add a vacation",
    "Recharge my wallet",
    "Payment History",
    "View my Bill",
    "View current Offers"
  ];

  showInfo(option: string): void {
    switch(option) {
      case 'Place an Order':
        
          this.infoToShow = {
            title: 'Single Day Order',
            description: [
              'Click on menu.',
              'Go to milk plan (Subscriptions).',
              'Select the desired product.',
              
            ],
            buttonLabel: 'Place an order for next day',
            
            description2: [
              'Select the quantity and the frequency (Daily/ Alternate Days/Specify days).',
              'Select the duration (it is optional).',
              'Click on Done and your delivery will be scheduled accordingly.'
            ],
            buttonLabel2: 'Add Subscription?',
            note: [
              'To ensure your delivery, we suggest placing/ updating your order before 8:00 PM.',
              'Kindly mark your location appropriately for uninterrupted deliveries.',
              'You can check the upcoming order on the calendar (home) screen which will be marked blue.'
            ]
          };
          break;

      case 'Add a vacation':
        this.infoToShow = {
          title: 'Add a Vacation',
          description: [
            'Navigate to the vacations section.',
            'Select the dates for your vacation.',
            'Confirm your vacation dates.'
          ],
          buttonLabel: 'Add a Vacation?',
          note: [
            'To ensure your delivery, we suggest placing/ updating your order before 8:00 PM.',
            'Kindly mark your location appropriately for uninterrupted deliveries.',
            'You can check the upcoming order on the calendar (home) screen which will be marked blue.'
          ]
        };
        break;

      case 'Recharge my wallet':
        this.infoToShow = {
          title: 'Recharge My Wallet',
          description: [
            'Go to the wallet section.',
            'Enter the amount to recharge.',
            'Select the payment method and confirm.'
          ],
          buttonLabel: 'Recharge My Wallet'
        };
        break;
      case 'Payment History':
        this.infoToShow = {
          title: 'Payment History',
          description: [
            'Navigate to the payment history section.',
            'View the list of all your past payments.',
            'Click on any payment to see more details.'
          ],
          buttonLabel: 'View My Payment History'

        };
        break;
      case 'View my Bill':
        this.infoToShow = {
          title: 'View My Bill',
          description: [
            'Go to the billing section.',
            'Select the billing period.',
            'View or download your bill.'
          ],
          buttonLabel: 'View My Bill'

        };
        break;
      case 'View current Offers':
        this.infoToShow = {
          title: 'View Current Offers',
          description: [
            'Navigate to the offers section.',
            'Browse through the current offers.',
            'Select an offer to view more details.'
          ],
          buttonLabel: 'View Current Offers'
        };
        break;
     
      default:
        this.infoToShow = null;
    }
    this.showDetails = this.infoToShow == null;
  }
  // closeInfo(): void {
  //   this.infoToShow = null;
  //   this.showDetails = true;
  // }
}
