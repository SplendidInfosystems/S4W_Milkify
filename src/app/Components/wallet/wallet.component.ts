import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  currentBalance: number = 0;
  ReBalance: number = 250;
  Balance: number = 1000;
  selectedOption: string = ''; 
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  price: number = 1000;
  totalPrice: number = this.price; 
  constructor(private router: Router) { }

  ngOnInit(): void { }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  toggleOption(option: string): void {
    this.selectedOption = option;
  }
  removeSection(section: string): void {
    const element = document.querySelector(`.${section}`);
    if (element) {
      element.remove();
    }
  }
  
 
}
