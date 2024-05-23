import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  isPopupVisible: boolean = false;
  selectedTimeSlot: string | undefined;
  showPopup = false;

  mediaRecorder: any;
  audioChunks: any[] = [];
  audioUrl: string | null = null;

  showRecordPopup = false;
  address: any;

  constructor(private router :Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.address = params;
    });
  }

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
  togglePopupAdd() {
    this.showPopup = !this.showPopup;
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