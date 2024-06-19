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

  loading: boolean = false;
  userData: any = {};

  postStatus: { statusCode: number, message: string, body: any } = { statusCode: 0, message: '', body: null };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const cachedUserData = localStorage.getItem('userData');
    if (cachedUserData) {
      this.userData = JSON.parse(cachedUserData);
    } else {
      this.getUserData(10); 
    }
  }
  

  getUserData(userId: number): void {
    this.loading = true;
    this.userService.getUser(userId).subscribe(
      (response: any) => {
        console.log('User Data:', response);
        this.userData = response.body || {};
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
      const userDataJson = JSON.stringify(this.userData); // Serialize userData to JSON string
      this.userService.postUser(userDataJson).subscribe(
        (response: any) => {
          console.log('User data posted successfully:', response);
          this.userData = response.body || {};
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
    // Optionally, you can call postData() here to save updated data immediately
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
    // Optionally, you can call postData() here to save updated data immediately
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }
}
