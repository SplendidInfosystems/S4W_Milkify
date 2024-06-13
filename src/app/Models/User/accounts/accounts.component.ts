import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  isPopupVisible: boolean = false;
  selectedTimeSlot: string | undefined;
  showPopup = false;
  showNamePopup: boolean = false;
  showConfirmationPopup: boolean = false;

  mediaRecorder: any;
  audioChunks: any[] = [];
  audioUrl: string | null = null;

  showRecordPopup = false;
  address: any;
  userData: any;
  number: string = '8149245674';
  errorMessage: string = '';
  showCancellationPopup: boolean = false;

  constructor(private router :Router,private route: ActivatedRoute,private userService: UserService){}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    } else {
      this.getUserData(10);
    }
    this.route.queryParams.subscribe(params => {
      this.address = params;
    });
  }

  openConfirmationPopup() {
    this.showConfirmationPopup = true;
  }

  closeConfirmationPopup() {
    this.showConfirmationPopup = false;
  }

  confirmLogout() {
    // Perform logout action here
    console.log('Logout confirmed');
    // Close confirmation popup
    this.closeConfirmationPopup();
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
  goBack(): void {
    this.router.navigate(['/prod-subs']);
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
  togglePopupAdd() {
    this.showPopup = !this.showPopup;
  }
 
  
    closeCancellationPopup() {
      this.showCancellationPopup = false;
      this.router.navigate([], {
        queryParams: {
          subscriptionCancelled: null
        },
        queryParamsHandling: 'merge'
      });
    }
  
    removeSection(section: string): void {
      const element = document.querySelector(`.${section}`);
      if (element) {
        element.remove();
      }
    }
  
    openNamePopup(): void {
      this.showNamePopup = true;
      this.errorMessage = ''; // Reset error message when opening the popup
    }
  
    closeNamePopup(): void {
      this.showNamePopup = false;
    }
  navigateToChangeAddress() {
    this.togglePopupAdd();
    this.router.navigate(['/location']);
  }

  toggleRecordPopup() {
    this.showRecordPopup = !this.showRecordPopup;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();

      this.mediaRecorder.addEventListener('dataavailable', (event: any) => {
        this.audioChunks.push(event.data);
      });

      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audioChunks = [];
      });
    } catch (err) {
      console.error('Error accessing microphone', err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }
}