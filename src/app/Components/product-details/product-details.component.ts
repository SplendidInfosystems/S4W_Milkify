import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatCalendarCellClassFunction, MatDateRangeInput, MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';


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
  form!: FormGroup;
alternateDates: Date[] = [];

  
  @ViewChild('startDateInput') startDateInput!: MatDateRangeInput<Date>; 
  @ViewChild('endDateInput') endDateInput!: MatDateRangeInput<Date>;

  
  @ViewChild(MatDateRangePicker) datePicker!: MatDateRangePicker<Date>; 
  @ViewChild('picker') picker: MatDatepicker<Date> | undefined;


  constructor(private dateAdapter: DateAdapter<Date>, private fb: FormBuilder,private router: Router) {
    this.defaultDate = new Date();
    this.form = this.fb.group({
      selectedDate: [null]
    });

    this.form.get('selectedDate')?.valueChanges.subscribe(date => {
      this.calculateAlternateDates(date);
    });
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
      } else if (subscriptionType === 'Alternate') {
        this.openCalendar();
      }
    }
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
  calculateAlternateDates(selectedDate: Date) {
    if (!selectedDate) {
      this.alternateDates = [];
      return;
    }
    this.alternateDates = [];
    for (let i = -15; i <= 15; i++) {
      if (i !== 0 && Math.abs(i) % 2 === 0) {
        const alternateDate = new Date(selectedDate);
        alternateDate.setDate(selectedDate.getDate() + i);
        this.alternateDates.push(alternateDate);
      }
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return this.alternateDates.some(d => d.getTime() === cellDate.getTime()) ? 'alternate-date' : '';
    }
    return '';
  };

}





