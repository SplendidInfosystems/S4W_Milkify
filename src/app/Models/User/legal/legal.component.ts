import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent {
  infoToShow: { title: string, description: string[], buttonLabel?: string, description2?: string[], buttonLabel2?: string, note?: string[] } | null = null;
  showDetails: boolean = true;
  // list: string[] = ['Information We Collect'];

  constructor(private router: Router) { }

  goBacktoCards() {
    this.infoToShow = null;
    this.showDetails = true; // Show the cards again
  }

  goBack() {
    this.router.navigate(['/prod-subs']);
  }

  legalOptions: string[] = [
    "Private Policy",
    "Terms and Condition",
  ];

  showInfo(option: string): void {
    switch(option) {
      case 'Private Policy':
        this.infoToShow = {
          title: 'Private Policy',
          description: [
            'Brief overview of the Milk app and its purpose.',
            'Commitment to user privacy.',
          ],
        
          note: [
            'To ensure your delivery, we suggest placing/ updating your order before 8:00 PM.',
            'Kindly mark your location appropriately for uninterrupted deliveries.',
            'You can check the upcoming order on the calendar (home) screen which will be marked blue.'
          ]
        };
        break;

      case 'Terms and Condition':
        this.infoToShow = {
          title: 'Terms and Condition',
          description: [
            'Navigate to the vacations section.',
            'Select the dates for your vacation.',
            'Confirm your vacation dates.'
          ],
          note: [
            'To ensure your delivery, we suggest placing/ updating your order before 8:00 PM.',
            'Kindly mark your location appropriately for uninterrupted deliveries.',
            'You can check the upcoming order on the calendar (home) screen which will be marked blue.'
          ]
        };
        break;

      default:
        this.infoToShow = null;
    }
    this.showDetails = this.infoToShow == null;
  }
}
