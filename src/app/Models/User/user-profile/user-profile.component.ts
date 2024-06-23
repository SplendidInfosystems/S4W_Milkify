import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string | null = null;
  newName: string = '';
  showNamePopup: boolean = false;

  email: string | null = null;
  newEmail: string = '';
  showEmailPopup: boolean = false;

  gender: string | null = null; 

  loading: boolean = false;
  userData: any = {};

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData(10); 
  }

  getUserData(userId: number): void {
    this.loading = true;
    this.userService.getUser(userId).subscribe(
      (response: any) => {
        console.log('User Data:', response);
        this.userData = response.body || {};
        this.name = this.userData.name || '';
        this.email = this.userData.email || '';
        this.gender = this.userData.gender || ''; 
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.loading = false;
      }
    );
  }  
  
  postData(): void {
    if (this.userData && Object.keys(this.userData).length > 0) {
      this.loading = true;

      const userDataToSend = {
        name: this.name,
        email: this.email,
        gender: this.gender 
      };
  
      this.userService.postUser(userDataToSend).subscribe(
        (response: any) => {
          console.log('User data posted successfully:', response);
          localStorage.setItem('userData', JSON.stringify(this.userData));
          this.loading = false;
        },
        (error: any) => {
          console.error('Error posting user data:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Cannot post empty user data.');
    }

  }

  openNamePopup(): void {
    this.newName = this.name || '';
    this.showNamePopup = true;
  }

  closeNamePopup(): void {
    this.showNamePopup = false;
  }

  saveName(): void {
    this.name = this.newName;
    localStorage.setItem('userName', this.newName);
    this.showNamePopup = false;
    this.postData(); 
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
    this.postData(); 
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }
  
}
