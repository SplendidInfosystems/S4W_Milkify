import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  startDate: Date = new Date('2024-05-10');
  defaultDate: Date;
  selectedSubscription: string = 'Daily';
  isSubscriptionTypesVisible: boolean = false;
  price: number = 53;
  quantity: number = 1;
  totalPrice: number = this.price;

  @ViewChild('picker') picker: MatDatepicker<any> | undefined; // Reference to the MatDatepicker

  constructor(private router: Router, private dateAdapter: DateAdapter<Date>) {
    this.defaultDate = new Date();
  }

  ngOnInit(): void {
    this.defaultDate = new Date();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  openDatePicker(): void {
    
  }

  openSubscriptionTypes(): void {
    this.isSubscriptionTypesVisible = true;
  }

  selectSubscription(subscription: string): void {
    this.selectedSubscription = subscription;
    this.isSubscriptionTypesVisible = false;

    if (subscription === 'Weekly') {
        this.router.navigate(['/weekly']);
    }
}

  increaseValue(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  decreaseValue(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.price * this.quantity;
  }

  openCalendar(): void {
    if (this.picker) {
        this.picker.open(); 
        if (this.selectedSubscription === 'Daily') {
            this.highlightDatesUntilEndOfMonth();
        } 
     
    }
}


  closeCalendar(): void {
    if (this.picker) {
      this.picker.close(); 
    }
  }

  private highlightDatesUntilEndOfMonth(): void {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const datesToHighlight = this.getDatesArray(this.defaultDate, lastDayOfMonth);
    this.picker?.select(datesToHighlight);
}

private getDatesArray(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    let currentDate = new Date(startDate); 
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    return dates;
}

}
