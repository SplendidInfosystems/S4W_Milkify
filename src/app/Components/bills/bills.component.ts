import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  currentMonth: string = 'May'; // Initially, set to May
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  totalBill: number = 0; // Initially, set to $0
  billAmounts: { [month: string]: number } = {
    'January': 100,
    'February': 150,
    'March': 120,
    'April': 220,
    'May': 0
  };

  constructor(private location: Location) {
    this.totalBill = this.billAmounts[this.currentMonth];
  }

  goBack(): void {
    this.location.back();
  }

  showPreviousMonth(): void {
    const currentIndex = this.months.indexOf(this.currentMonth);
    if (currentIndex > 0) {
      this.currentMonth = this.months[currentIndex - 1];
      this.totalBill = this.billAmounts[this.currentMonth];
    }
  }

  showNextMonth(): void {
    const currentIndex = this.months.indexOf(this.currentMonth);
    if (currentIndex < this.months.length - 1) {
      this.currentMonth = this.months[currentIndex + 1];
      this.totalBill = this.billAmounts[this.currentMonth];
    }
  }
}
