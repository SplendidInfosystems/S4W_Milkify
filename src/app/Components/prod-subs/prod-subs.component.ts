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
      { icon: 'subscriptions', name: 'Subscription', route: 'my-sub' },
      { icon: 'beach_access', name: 'Vacation', route: 'vacation' }
    ], 
    [
      { icon: 'shopping_cart', name: 'Order History', route: 'orders' },
      { icon: 'payment', name: 'Transactions', route: 'transaction' },
      { icon: 'date_range ', name: 'Monthly Bill', route: 'bills' }
    ],
    [
      { icon: 'receipt', name: 'Referral', route: 'refer' },
      { icon: 'local_activity', name: 'Offer Zone', route: 'offers' },
      { icon: '', name: '', route: '' }
  
    ]
  ];
  
  getColumnHeader(index: number): string {
    const headers = ['Products and Subscription', 'Orders and Billings', ' Rewards']; 
    return headers[index] || ''; 
  }
  cards = [
    { image: 'person', title: 'Account & Preference', description: 'Edit Address,Delivery Preferences', route: '/accounts' },
    { image: 'credit_card', title: 'Wallet and payments', description: 'Add Money,Add or Saved Cards', route: '/wallet' },
    { image: 'help_outline', title: '   Need Help?     ', description: 'Call or Chat  with us', route: '/need-help' },
    { image: 'security', title: 'Legal', description: 'Privacy, Terms and Condition', route: '/legal' },
   
  ];
  navigateToCol(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }
  
  navigateTo(card: { image: string; title: string; description: string; route: string }) {
    this.router.navigate([card.route]);
  }
}
