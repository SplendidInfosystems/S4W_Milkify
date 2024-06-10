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

  constructor(private location: Location, private router: Router, private billService: BillService) {}

  ngOnInit(): void {
    const userId = 11;
    this.getMonthlyBillForCurrentUser(userId);
  }

  getMonthlyBillForCurrentUser(userId: number): void {
    this.billService.getMonthlyBill(userId).subscribe(
      (response: any) => {
        console.log('Monthly Bill Response:', response.body);
        this.monthData = response.body;
        if (this.monthData.length > 0) {
          this.currentMonth = this.monthData[0].month;
          this.calculateTotalBill();
        }
      },
      (error) => {
        console.error('Error fetching monthly bill:', error);
      }
    );
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
