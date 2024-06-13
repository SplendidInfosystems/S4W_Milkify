import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionService } from '../../../Services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  walletBalance: number = 0.0; 
  transactions: any[] = []; 

  constructor(
    private location: Location,
    private router: Router,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.getTransactionData(1);
  }

  goBack(): void {
    this.location.back();
  }

  navigateToWallet(): void {
    localStorage.setItem('fromTransactionPage', 'true');
    this.router.navigate(['/wallet']);
  }

  goToProductDetails(): void {
    this.router.navigate(['/home']);
  }

 getTransactionData(userId: number): void {
    this.transactionService.getTransactionData(userId).subscribe(
      (data) => {
        console.log('Transaction Data:', data);
        this.walletBalance = data.walletBalance || 0.0;
        this.transactions = data.transactions || [];
      },
      (error) => {
        console.error('Error fetching transaction data:', error);
      }
    );
  }
}
