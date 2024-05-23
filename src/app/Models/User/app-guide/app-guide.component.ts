import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-guide',
  templateUrl: './app-guide.component.html',
  styleUrl: './app-guide.component.css'
})
export class AppGuideComponent {
  infoToShow: { title: string, description: string } | null = null;
  showDetails: boolean = true;
  constructor( private router:Router) { }
  goBack() {
    this.router.navigate(['/need-help']);
}
 
guideOptions: string[] = [
  "Add a vacation",
  "Recharge my wallet",
  "Payment History",
  "View my Bill",
  "View current Offers"
];


showInfo(option: string): void {
 
  if (option === 'Place an Order') {
    this.infoToShow = {
      title: 'Place an Order',
      description: 'Here you can find instructions on how to place an order.'
    };
    this.showDetails = false; // Hide other options
  } else {
    this.infoToShow = null; // Clear info if option not recognized
  }
}
}