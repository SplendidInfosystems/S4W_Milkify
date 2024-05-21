import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  name: string = 'Bhavna';
  newName: string = '';
  showNamePopup: boolean = false;
  
  email: string | null = null;
  newEmail: string = '';
  showEmailPopup: boolean = false;
  constructor(private router :Router){}
  goBack(): void {
    this.router.navigate(['/accounts']);
  }
 
  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.name = storedName;
    }
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.email = storedEmail;
    }
  }
  openNamePopup(): void {
    this.newName = this.name;  // Pre-fill with the current name
    this.showNamePopup = true;
  }
  closeNamePopup(): void {
    this.showNamePopup = false;
  }
  saveName(): void {
    this.name = this.newName;
    localStorage.setItem('userName', this.newName);  // Store the name in local storage
    this.showNamePopup = false;
  }
  openEmailPopup(): void {
    this.newEmail = this.email || '';  // Pre-fill with the current email
    this.showEmailPopup = true;
  }
  closeEmailPopup(): void {
    this.showEmailPopup = false;
  }
  saveEmail(): void {
    this.email = this.newEmail;
    localStorage.setItem('userEmail', this.newEmail);  // Store the email in local storage
    this.showEmailPopup = false;
  }
}