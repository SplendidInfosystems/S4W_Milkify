import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDateRangeInput, MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  images = [
    'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg',
    'https://imgmedia.lbb.in/media/2021/06/60d2e2cda7f7900b57c7ccce_1624433357587.jpg',
    'https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.191015075931.b6s6/catalogue/country-delight-okhla-industrial-area-delhi-milk-dairy-nlw19dbmil.jpg',
    'https://qph.cf2.quoracdn.net/main-qimg-30d4572669a338e4b3dc089de2c587ca'
  ];
  startDate: Date = new Date();
  endDate: Date = new Date();
  defaultDate: Date;
  date = '31 may 2024';
  selectedSubscription = 'Daily';
  isSubscriptionTypesVisible: boolean = false;
  price: number = 53;
  isAlternateCalendarVisible: boolean = false;
  isDailyCalendarVisible: boolean = false;
  quantity: number = 1;
  totalPrice: number = this.price;
  subscriptionTypes: string[] = ['Daily', 'Alternate', 'Weekly', 'One Time'];
  form!: FormGroup;
  selectedDates: Date[] = [];
  isEditing = false;

  @ViewChild('startDateInput') startDateInput!: MatDateRangeInput<Date>;
  @ViewChild('endDateInput') endDateInput!: MatDateRangeInput<Date>;
  @ViewChild(MatDateRangePicker) datePicker!: MatDateRangePicker<Date>;
  @ViewChild('picker') picker: MatDatepicker<Date> | undefined;

  constructor(private dateAdapter: DateAdapter<Date>, private fb: FormBuilder, private router: Router) {
    this.defaultDate = new Date();
    this.form = this.fb.group({
      selectedDate: [null]
    });

    this.form.get('selectedDate')?.valueChanges.subscribe(date => {
      this.calculateSelectedDates(date);
    });
  }

  ngOnInit(): void {
    this.defaultDate = new Date();
  }

  toggleSubscriptionTypes() {
    this.isSubscriptionTypesVisible = !this.isSubscriptionTypesVisible;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  increaseValue() {
    this.quantity++;
    this.updateTotalPrice();
  }
  decreaseValue() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotalPrice();
    } else {
      this.quantity = 0;
      this.isEditing = false;
    }
  }

  addQuantity() {
    this.quantity = 1;
    this.isEditing = true;
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = this.price * this.quantity;
  }

  selectSubscription(subscriptionType: string) {
    this.selectedSubscription = subscriptionType;
    this.selectedDates = [];
    this.startDate = new Date();
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);

    if (subscriptionType === 'One Time') {
      this.datePicker.open();
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
  shareOnWhatsApp(): void {
    const message = encodeURIComponent('Message on whatsapp for new offers!');
    const url = encodeURIComponent('https://img.freepik.com/premium-photo/sustainable-travel-photo-abstract-expressionism-art-white-background_873925-1022238.jpg?w=740');
    const whatsappUrl = `https://wa.me/?text=${message}%20${url}`;
    window.open(whatsappUrl, '_blank');
  }
}
