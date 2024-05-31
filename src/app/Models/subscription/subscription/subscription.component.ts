import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCalendarCellClassFunction, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscriptionService } from '../../../Services/subscription.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  images = [
    'https://images.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-0l3apfgg1l.jpg',
    'https://s3.us-west-2.amazonaws.com/customer-app-cards/promotions/milk_1628769125586.png',
    'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg',
  ];
  price = 27;
  quantity = 1;
  date = '30 may 2024';
  selectedDates: Date[] = [];
  totalPrice = 27;
  alternateDates: Date[] = [];
  isSubscriptionTypesVisible = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedSubscription = 'Daily';
  defaultDate = new Date();
  showResumePopup = false;
  showCancelPopup = false;
  @ViewChild('picker') picker: MatDatepicker<any> | undefined;
  isEditing = false;
  showCancellationPopup: boolean = false;
  showPausePopup: boolean = false;
  showPausedDurationPopup: boolean = false;
  endDateInput: any;
  form: any;
  
  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private snackBar: MatSnackBar,
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.defaultDate = new Date();
    this.form = this.fb.group({
      selectedDate: [null]
    });

   
  }
  ngOnInit(): void {
    this.defaultDate = new Date();
    const subscriptionData = this.subscriptionService.getSubscriptionData();
    this.isEditing = !!subscriptionData; // Determine if we're editing based on existing data
  
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      if (params['subscriptionCancelled']) {
        this.showCancellationPopup = true;
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/prod-subs']);
  }
  increaseValue() {
    this.quantity++;
    this.updateTotalPrice();
  }
  decreaseValue() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotalPrice();
    }
  }
  updateTotalPrice() {
    this.totalPrice = this.price * this.quantity;
  }
  toggleSubscriptionTypes() {
    this.isSubscriptionTypesVisible = !this.isSubscriptionTypesVisible;
  }
  selectSubscription(subscription: string): void {
    this.selectedSubscription = subscription;
    this.isSubscriptionTypesVisible = false;
    if (subscription === 'Daily') {
      // Open the calendar when "Daily" subscription is selected
      if (this.picker) {
        this.picker.open();
      }
    }

    if (subscription === 'Weekly') {
        this.router.navigate(['/weekly']);
    }
}
  openCalendar(): void {
    if (this.picker) {
      this.picker.open();
    }
  }
  confirmSubscription() {
    const subscriptionData = {
      images: this.images,
      price: this.price,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      subscriptionType: this.selectedSubscription,
      date: this.defaultDate
    };
    this.subscriptionService.saveSubscriptionData(subscriptionData);
    
    // this.snackBar.open('Subscription confirmed successfully!', 'Close', {
    //   duration: 3000,
    // });
    this.router.navigate(['/my-sub']);
  }
  resumeSubscription(event: Event) {
    event.preventDefault();
    this.showResumePopup = true;
  }
  
  cancelSubscription() {
    this.showCancelPopup = true;
  }
  closeResumePopup() {
    this.showResumePopup = false;
  }
  closeCancelPopup() {
    this.showCancelPopup = false;
  }
  confirmCancelSubscription() {
    this.showCancelPopup = false; // Close the cancel subscription popup
    console.log('Subscription canceled successfully!');
    // this.snackBar.open('Subscription canceled successfully!', 'Close', {
    //   duration: 3000,
    // });
    this.router.navigate(['/orders'], { queryParams: { showCancelPopup: true } });
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
  pauseSubscription() {
    this.showPausePopup = true;
  }
  closePausePopup() {
    this.showPausePopup = false;
  }
  confirmPause() {
    // Logic to pause the subscription
    this.showPausePopup = false;
    this.showPausedDurationPopup = true;
  }
  closePausedDurationPopup() {
    this.showPausedDurationPopup = false;
    // this.snackBar.open('Your subscription has been paused.', 'Close', {
    //   duration: 3000,
    // });
  }
  calculateSelectedDates(startDate: Date): void {
    if (!startDate) {
      this.selectedDates = [];
      return;
    }

    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    this.selectedDates = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (this.selectedSubscription === 'Daily' || (this.selectedSubscription === 'Alternate' && d.getDate() % 2 === startDate.getDate() % 2)) {
        this.selectedDates.push(new Date(d));
      }
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.selectedDates.some(d => d.getTime() === cellDate.getTime()) ? 'selected-date' : '';
    }
    return '';
  };

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    return date ? date >= today : false;
  };
  shareOnWhatsApp(): void {
    const message = encodeURIComponent('Message on whatsapp for new offers!');
    const url = encodeURIComponent('https://img.freepik.com/premium-photo/sustainable-travel-photo-abstract-expressionism-art-white-background_873925-1022238.jpg?w=740');
    const whatsappUrl = `https://wa.me/?text=${message}%20${url}`;
    window.open(whatsappUrl, '_blank');
  }
}