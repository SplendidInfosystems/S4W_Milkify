import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrl: './need-help.component.css'
})
export class NeedHelpComponent {
  constructor(private location: Location, private router:Router) {}
  orders = [
    { name: 'Buffalo Milk', quantity: 450, count: 1, image: 'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg' , outOfStock: true},
    { name: 'Creamy Cow Milk', quantity: 450, count: 1, image: 'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg' , outOfStock: false},
    // Add more items if needed
  ];
  items = [
    { header: 'App Guide', description: 'Troubleshooting',route:'/app-guide' },
    { header: 'Payments and cashback', description: 'For cashback, payment and referral related issues', route:'/payment' },
    { header: 'Membership', description: 'View your membership details and renew your plan' ,route:'/subscription'},
    { header: 'Profile and Address', description: 'Update profile information like address, time-slot etc.', route:'/accounts' }
  ];
  goBack() {
    this.router.navigate(['/prod-subs']);
}
  callUs() {
    window.location.href = 'tel:+1234567890';
  }
  mailUs() {
    window.location.href = 'mailto:support@example.com';
  }
  
}