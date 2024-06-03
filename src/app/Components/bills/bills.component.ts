import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  currentMonth: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  totalBill: number = 0; // Initially, set to ₹0
  billAmounts: { [month: string]: number } = {
    'January': 100,
    'February': 150,
    'March': 120,
    'April': 220,
    'May': 320,
    'June': 0
  };

  constructor(private location: Location,private router:Router) {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // JavaScript months are 0-based
    this.currentMonth = this.months[currentMonthIndex];
    this.totalBill = this.billAmounts[this.currentMonth];
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['/prod-subs']);
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
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // JavaScript months are 0-based
    if (currentIndex < currentMonthIndex) {
      this.currentMonth = this.months[currentIndex + 1];
      this.totalBill = this.billAmounts[this.currentMonth];
    }
  }

  showPreviousArrow(): boolean {
    const currentIndex = this.months.indexOf(this.currentMonth);
    return currentIndex > 0;
  }

  showNextArrow(): boolean {
    const currentIndex = this.months.indexOf(this.currentMonth);
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // JavaScript months are 0-based
    return currentIndex < currentMonthIndex;
  }
}
