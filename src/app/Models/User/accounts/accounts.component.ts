import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  isPopupVisible: boolean = false;
  selectedTimeSlot: string | undefined;
  
  constructor(private router :Router){}
  goBack(): void {
    this.router.navigate(['/subscription']);
  }
  navigateToUserProfile() {
    this.router.navigate(['/user-profile']);
 
  }
  logout() {
    this.router.navigate(['/login']);
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
  closePopup(): void {
    this.isPopupVisible = false;
  }
  confirmSelection(): void {
    console.log('Selected delivery time slot:', this.selectedTimeSlot);
    this.closePopup();
  }
}