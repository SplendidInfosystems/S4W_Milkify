import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  name: string | null = null ;
  newName: string = '';
  showNamePopup: boolean = false;
  
  email: string | null = null;
  newEmail: string = '';
  showEmailPopup: boolean = false;
  userData: any = {};

  constructor(private router :Router ,private userService: UserService){}
  goBack(): void {
    this.router.navigate(['/accounts']);
  }
 
  ngOnInit(): void {
    
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    } else {
      this.getUserData(10);
    }
  
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.name = storedName;
    }
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.email = storedEmail;
    }
  }
  

  getUserData(userId: number): void {
    this.userService.getUser(userId).subscribe(
      (response: any) => {
        console.log('User Data:', response);
        this.userData = response.body || {}; 
        localStorage.setItem('userData', JSON.stringify(this.userData)); 
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  postData(): void {
    this.userService.postUser(this.userData).subscribe(
      (response: any) => {
        console.log('User data posted successfully:', response);
        localStorage.setItem('userData', JSON.stringify(this.userData));
      },
      (error: any) => {
        console.error('Error posting user data:', error);
      }
    );
  }
  
  openNamePopup(): void {
    this.newName = this.name  || '';  
    this.showNamePopup = true;
  }
  closeNamePopup(): void {
    this.showNamePopup = false;
  }
  saveName(): void {
    this.name = this.newName;
    localStorage.setItem('userName', this.newName);  
    this.showNamePopup = false;
  }
  openEmailPopup(): void {
    this.newEmail = this.email || '';  
    this.showEmailPopup = true;
  }
  closeEmailPopup(): void {
    this.showEmailPopup = false;
  }
  saveEmail(): void {
    this.email = this.newEmail;
    localStorage.setItem('userEmail', this.newEmail);  
    this.showEmailPopup = false;
  }
}