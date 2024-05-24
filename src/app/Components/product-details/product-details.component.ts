import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDateRangeInput, MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  startDate: Date = new Date();
  endDate: Date = new Date();
  defaultDate: Date;
  selectedSubscription = 'Daily';
  isSubscriptionTypesVisible: boolean = false;
  price: number = 53;
  isAlternateCalendarVisible: boolean = false;
  isDailyCalendarVisible: boolean = false;
  alternateSelectedDate: Date[] = [];
  quantity: number = 1;
  totalPrice: number = this.price;
  subscriptionTypes: string[] = ['Daily', 'Alternate', 'Weekly', 'One Time'];

  
  @ViewChild('startDateInput') startDateInput!: MatDateRangeInput<Date>; 
  @ViewChild('endDateInput') endDateInput!: MatDateRangeInput<Date>;

  
  @ViewChild(MatDateRangePicker) datePicker!: MatDateRangePicker<Date>; 
  @ViewChild('picker') picker: MatDatepicker<Date> | undefined;

  constructor(private router: Router,private dateAdapter: DateAdapter<Date>) {
    this.defaultDate = new Date();
  }
  toggleSubscriptionTypes() {
    this.isSubscriptionTypesVisible = !this.isSubscriptionTypesVisible;
  }
  ngOnInit(): void {
    this.defaultDate = new Date();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  openSubscriptionTypes() {
    this.isSubscriptionTypesVisible = !this.isSubscriptionTypesVisible;
  }

  increaseValue(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  decreaseValue(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.price * this.quantity;
  }

  openAlternateCalendar() {
    this.isAlternateCalendarVisible = true;
  }
  openDailyCalendar(){
    this.isDailyCalendarVisible = true;
  }

  closeAlternateCalendar() {
    this.isAlternateCalendarVisible = false;
  }

  selectSubscription(subscriptionType: string) {
    this.selectedSubscription = subscriptionType;
    
    if (subscriptionType === 'One Time') {
      // Open the calendar when "One Time" subscription is selected
      this.datePicker.open();
    } else if (subscriptionType === 'Weekly') {
      this.router.navigate(['/weekly']);
    } else {
  
      this.startDate = new Date(); 
      this.endDate = new Date();
      
      if (subscriptionType === 'Daily') {
        this.openCalendar();
        this.selectDailyDates(this.defaultDate);
      } else if (subscriptionType === 'Alternate') {
        this.openCalendar();
        this.selectAlternateDate(this.defaultDate);
      }
    }
  }
  

  selectDailyDates(event: Date) {
    const selectedDate = new Date(event);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const alternateDates = [];

    for (let i = 1; i <= lastDayOfMonth; i += 2) {
      alternateDates.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }
    this.alternateSelectedDate = alternateDates.slice();
  }

  selectAlternateDate(event: Date) {
    const selectedDate = new Date(event);
    const today = new Date(); 
    const dailyDates = [];
    for (let i = selectedDate.getDate(); i <= selectedDate.getDate(); i++) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      if (currentDate >= today) {
        dailyDates.push(currentDate);
      }
    }
    this.alternateSelectedDate = dailyDates.slice();
    dailyDates.forEach(date => {
      this.picker?.select(date);
    });
  }
  
  

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
  onStartDateSelected(selectedDate: Date) {
    const endDate = new Date(selectedDate.getFullYear(), 11, 31);
    this.dateAdapter.setLocale('en'); // Set locale if necessary
    this.endDateInput._startInput.value = selectedDate;
    this.endDateInput._endInput.value = endDate;
  }

}
