import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent {
  days: string[] = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  selectedDays: string[] = [];
  showError: boolean = false;
  selectedDay: string | null = null; 
  dayQuantities: { [key: string]: number } = {};
  quantity: number = 1;
  price: number = 53;
  totalPrice: number = this.price;
  constructor(private router: Router) { }

  ngOnInit(): void { }

  goBack(): void {
    this.router.navigate(['/home']);
  }
 
  popularItems = [
    {
      name: 'Milkify Cream Milk',
      price: '₹50',
      litre: '300ml',
      image:
        'https://cdnasd.countrydelight.in/New_product_image/BM_1646846227411_1665204467802.png',
    },
  ]
  
  toggleDaySelection(day: string): void {
    const index = this.selectedDays.indexOf(day);
    if (index === -1) {
      this.selectedDays.push(day);
      this.selectedDay = day; 
    } else {
      this.selectedDays.splice(index, 1);
      this.selectedDay = null; 
    }
  }

  increaseValue(day: string): void {
    if (!this.dayQuantities[day]) {
      this.dayQuantities[day] = 1;
    } else {
      this.dayQuantities[day]++;
    }
    this.calculateTotalPrice(); 
  }
  

  decreaseValue(day: string): void {
    if (this.dayQuantities[day] && this.dayQuantities[day] > 1) {
      this.dayQuantities[day]--;
      this.calculateTotalPrice();
    }
  }
  
  calculateTotalPrice(): void {
    let totalPrice = 0;
    for (const day in this.dayQuantities) {
      if (this.dayQuantities.hasOwnProperty(day)) {
        totalPrice += this.price * this.dayQuantities[day];
      }
    }
    this.totalPrice = totalPrice;
  }
  
  confirmSubscription() {
    if (this.selectedDays.length === 0) {
        this.showError = true;
    } else {
        // Your subscription confirmation logic here
        this.showError = false; // Reset error state if subscription is confirmed
    }
}
}
