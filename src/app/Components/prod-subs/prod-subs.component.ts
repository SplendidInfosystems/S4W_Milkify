import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-subs',
  templateUrl: './prod-subs.component.html',
  styleUrl: './prod-subs.component.css'
})
export class ProdSubsComponent {
  constructor(private router: Router) {}
  rows = [
    [ 
      { icon: 'inventory', name: 'Products', route: 'home' },
      { icon: 'subscriptions', name: 'Subscription', route: 'subscription' },
      { icon: 'beach_access', name: 'Vacation', route: 'vacation' }
    ], 
    [
      { icon: 'shopping_cart', name: 'Order History', route: 'orders' },
      { icon: 'payment', name: 'Transactions', route: 'transaction' },
      { icon: 'date_range ', name: 'Monthly Bill', route: 'bills' }
    ],
    [
      { icon: 'receipt', name: 'Refer', route: 'refer' },
      { icon: 'local_offer', name: 'Offer Zone', route: 'offer-zone' }
    ]
  ];
  
  getColumnHeader(index: number): string {
    // Define your logic to get column headers based on index
    // For example:
    const headers = ['Products and Subscription', 'Orders and Billings', ' Rewards']; 
    return headers[index] || ''; 
  }
  cards = [
    { image: 'account_circle', title: 'Account & Preference', description: 'Edit Address', route: '/accounts' },
    { image: 'account_balance_wallet', title: 'Wallet & payments', description: 'Add Money', route: '/wallet' },
    { image: 'help', title: 'Need Help?', description: 'Call or Chat with us', route: '/need-help' },
    { image: 'assignment_turned_in', title: 'Legal', description: 'Terms & Condition', route: '/legal' }
  ];
  navigateTocol(route: string): void {
    this.router.navigate([route]);
  }
  navigateTo(card: { image: string; title: string; description: string; route: string }) {
    this.router.navigate([card.route]);
  }
}
