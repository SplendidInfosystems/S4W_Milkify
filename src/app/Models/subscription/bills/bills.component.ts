import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BillService } from '../../../Services/bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  currentMonth: string = '';
  totalBill: number = 0;
  monthData: any[] = [];
  loading: boolean = true;

  constructor(private location: Location, private router: Router, private billService: BillService) {}

  ngOnInit(): void {
    const userId = 1;
    const storedData = localStorage.getItem('monthlyBillData');
    if (storedData) {
      this.monthData = JSON.parse(storedData);
      this.updateView();
      this.loading = false;
    } else {
      this.getMonthlyBillForCurrentUser(userId);
    }
  }

  getMonthlyBillForCurrentUser(userId: number): void {
    this.loading = true;

    this.billService.getMonthlyBill(userId).subscribe(
      (response: any) => {
        console.log('Monthly Bill Response:', response.body);
        this.monthData = response.body;
        localStorage.setItem('monthlyBillData', JSON.stringify(this.monthData));
        this.addStaticMonths();
        this.updateView();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching monthly bill:', error);
        this.loading = false; // Stop loading spinner on error
      }
    );
  }


  addStaticMonths(): void {
 
    const monthsToAdd = [
      { month: 'January', total_bill: 0 },
      { month: 'March', total_bill: 0 },
      { month: 'April', total_bill: 0 },
      { month: 'May', total_bill: 0 },
      { month: 'June', total_bill: 0 },
      { month: 'July', total_bill: 0 },
      { month: 'August', total_bill: 0 },
      { month: 'September', total_bill: 0 },
      { month: 'November', total_bill: 0 },

    ];

    monthsToAdd.forEach(month => {
      if (!this.monthData.find(data => data.month === month.month)) {
        this.monthData.push(month);
      }
    });

    this.monthData.sort((a, b) => {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
    });
  }

  updateView(): void {
    if (this.monthData.length > 0) {
      this.currentMonth = this.monthData[0].month;
      this.calculateTotalBill();
    }
  }

  calculateTotalBill(): void {
    const currentMonthData = this.monthData.find(data => data.month === this.currentMonth);
    if (currentMonthData) {
      this.totalBill = currentMonthData.total_bill;
    } else {
      this.totalBill = 0;
    }
  }

  goBack(): void {
    this.router.navigate(['/prod-subs']);
  }

  showPreviousMonth(): void {
    const currentIndex = this.monthData.findIndex(data => data.month === this.currentMonth);
    if (currentIndex > 0) {
      this.currentMonth = this.monthData[currentIndex - 1].month;
      this.calculateTotalBill();
    }
  }

  showNextMonth(): void {
    const currentIndex = this.monthData.findIndex(data => data.month === this.currentMonth);
    if (currentIndex < this.monthData.length - 1) {
      this.currentMonth = this.monthData[currentIndex + 1].month;
      this.calculateTotalBill();
    }
  }

  showPreviousArrow(): boolean {
    const currentIndex = this.monthData.findIndex(data => data.month === this.currentMonth);
    return currentIndex > 0;
  }

  showNextArrow(): boolean {
    const currentIndex = this.monthData.findIndex(data => data.month === this.currentMonth);
    return currentIndex < this.monthData.length - 1;
  }
}
