import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  showLocationPopup = false;
  showMapPopup = false;
  latitude: any;
  longitude: any;
  zoom = 8;
  isPopupVisible = false;
  addressForm: FormGroup;
  currentLocation: any;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.askForLocation();
  }

  askForLocation() {
    this.showLocationPopup = true;
  }

  toggleLocationPopup() {
    this.showLocationPopup = !this.showLocationPopup;
  }

  enableLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.latitude = latitude;
          this.longitude = longitude;
          this.getLocationAddress(latitude, longitude);
          this.showLocationPopup = false;
        },
        (error) => {
          console.error('Error getting location', error);
          alert('Unable to fetch location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  getLocationAddress(latitude: number, longitude: number) {
    // Call a geocoding service to convert latitude/longitude to an address
    // For example, using Google Maps Geocoding API or any other geocoding service
    // Here is a placeholder for the actual implementation
    this.currentLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
  }

  toggleMapPopup() {
    this.showMapPopup = !this.showMapPopup;
  }

  confirmLocation() {
    console.log(`Location confirmed: ${this.latitude}, ${this.longitude}`);
    this.toggleMapPopup();
  }

  close() {
    console.log('Closed');
    this.router.navigate(['/accounts']); // Replace with the actual route
  }

  enterCompleteAddress() {
    console.log('Navigating to complete address form');
    this.router.navigate(['/accounts']); // Replace with the actual route
  }

  mapClicked(event: any) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.router.navigate(['/accounts'], { queryParams: this.addressForm.value });
      console.log('Address:', this.addressForm.value);
      this.closePopup();
    }
  }
}
