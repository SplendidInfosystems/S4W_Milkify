import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCalendarCellClassFunction, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscriptionService } from '../../../Services/subscription.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  images = [
    'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg',
    'https://imgmedia.lbb.in/media/2021/06/60d2e2cda7f7900b57c7ccce_1624433357587.jpg',
    'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg',
    'https://qph.cf2.quoracdn.net/main-qimg-30d4572669a338e4b3dc089de2c587ca'
  ];

  showModal = false;
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDates: Date[] = [];
  currentMonth: Date = new Date(); 
  selectedDuration: string | null = null;

  price = 27;
  quantity = 1;
  date = '30 may 2024';
  selectedDates: Date[] = [];
  // totalPrice = 27;
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
  totalPrice = this.price * this.quantity;
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

    this.generateCalendar(new Date());
  }
  ngOnInit(): void {
    this.defaultDate = new Date();
    this.subscriptionService.isEditing$.subscribe(isEditing => {
      this.isEditing = isEditing;
    });
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      if (params['subscriptionCancelled']) {
        this.showCancellationPopup = true;
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/prod-subs']);
  }
  
  increaseValue(): void {
    this.quantity++;
    this.updateTotalPrice();
  }

  decreaseValue(): void {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.quantity = 0;
    }
    this.updateTotalPrice();
  }

  addQuantity(): void {
    this.quantity++;  // Directly increment the quantity
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.price * this.quantity;
  }
  toggleSubscriptionTypes() {
    this.isSubscriptionTypesVisible = !this.isSubscriptionTypesVisible;
  }
 


  resumeSubscription(event: Event) {
    event.preventDefault();
    this.showResumePopup = true;
    this.checkAndCloseCancelPopup();
  }

  cancelSubscription() {
    this.showCancelPopup = true;
  }

  closeResumePopup() {
    this.showResumePopup = false;
    this.checkAndCloseCancelPopup();
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
    this.checkAndCloseCancelPopup();
    this.router.navigate([], {
      queryParams: {
        subscriptionCancelled: null
      },
      queryParamsHandling: 'merge'
    });
  }

  pauseSubscription() {
    console.log('Pause subscription clicked');
    this.showPausePopup = true;
    this.checkAndCloseCancelPopup();
  }

  closePausePopup() {
    this.showPausePopup = false;
    this.checkAndCloseCancelPopup();
  }

  confirmPause() {
    if (this.isDurationSelected()) {
      // Logic to pause the subscription
      this.showPausePopup = false;
      this.showPausedDurationPopup = true;
      this.checkAndCloseCancelPopup();
    }
  }
  closePausedDurationPopup() {
    this.showPausedDurationPopup = false;
    // this.snackBar.open('Your subscription has been paused.', 'Close', {
    //   duration: 3000,
    // });
    this.checkAndCloseCancelPopup();
  }

  checkAndCloseCancelPopup() {
    if (!this.showResumePopup && !this.showPausePopup && !this.showPausedDurationPopup && !this.showCancellationPopup) {
      this.closeCancelPopup();
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
  }



  shareOnWhatsApp(): void {
    const message = encodeURIComponent('Message on whatsapp for new offers!');
    const url = encodeURIComponent('https://img.freepik.com/premium-photo/sustainable-travel-photo-abstract-expressionism-art-white-background_873925-1022238.jpg?w=740');
    const whatsappUrl = `https://wa.me/?text=${message}%20${url}`;
    window.open(whatsappUrl, '_blank');
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  generateCalendar(month: Date) {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    this.calendarDates = [];
    for (let i = firstDay.getDay(); i > 0; i--) {
      this.calendarDates.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - i));
    }

    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      this.calendarDates.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), day));
    }
  }

  isDateSelected(date: Date): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) return false;
    return date >= this.selectedStartDate && date <= this.selectedEndDate;
  }

  selectDate(date: Date) {
    if (!this.selectedStartDate || this.selectedEndDate) {
      this.selectedStartDate = date;
      this.selectedEndDate = null;
    } else if (date < this.selectedStartDate) {
      this.selectedStartDate = date;
    } else {
      this.selectedEndDate = date;
    }
  }
  selectSubscription(subscriptionType: string) {
    this.selectedSubscription = subscriptionType;
    this.selectedDates = [];
    this.startDate = new Date();
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);

    if (subscriptionType === 'One Time') {
      this.openCalendar();
    } else if (subscriptionType === 'Weekly') {
      this.router.navigate(['/weekly']);
    } else {
      this.calculateSelectedDates(this.startDate);
      this.openCalendar();
    }
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

  openCalendar(): void {
    if (this.picker) {
      this.picker.open();
    }
  }

  closeCalendar(): void {
    if (this.picker) {
      this.picker.close();
    }
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
    this.generateCalendar(this.currentMonth);
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
    this.generateCalendar(this.currentMonth);
  }
  areDatesSelected(): boolean {
    return this.selectedStartDate !== null && this.selectedEndDate !== null;
  }

  handleDatesSelection() {
    console.log('Start Date:', this.selectedStartDate);
    console.log('End Date:', this.selectedEndDate);
    this.closeModal();
  }
  onOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedDuration = target.value;
  }

  isDurationSelected(): boolean {
    return this.selectedDuration !== null;
  }
  
}