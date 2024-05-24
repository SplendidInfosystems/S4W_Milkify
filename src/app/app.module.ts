
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { TapbarComponent } from './Components/tapbar/tapbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { WalletComponent } from './Components/wallet/wallet.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { NgModule } from '@angular/core';
import { WeeklyComponent } from './Components/weekly/weekly.component';
import { LoginComponent } from './Models/login/login/login.component';
import { LoginNextComponent } from './Models/login/login/login-next/login-next.component';
import { BillsComponent } from './Components/bills/bills.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProdSubsComponent } from './Components/prod-subs/prod-subs.component';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { SubscriptionComponent } from './Models/subscription/subscription/subscription.component';
import { MySubComponent } from './Models/subscription/my-sub/my-sub.component';
import { VacationComponent } from './Models/vacation/vacation/vacation.component';
import { AddVacComponent } from './Models/vacation/add-vac/add-vac.component';
import { AccountsComponent } from './Models/User/accounts/accounts.component';
import { AppGuideComponent } from './Models/User/app-guide/app-guide.component';
import { NeedHelpComponent } from './Models/User/need-help/need-help.component';
import { UserProfileComponent } from './Models/User/user-profile/user-profile.component';
import { LocationComponent } from './Models/User/location/location.component';
import { OffersComponent } from './Components/offers/offers.component';
import { ReferComponent } from './Components/refer/refer.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    TapbarComponent,
    LoginComponent,
    LoginNextComponent,
    ProductDetailsComponent,
    WalletComponent,
    PaymentComponent,
    WeeklyComponent,
    BillsComponent,
    OrdersComponent,
    ProdSubsComponent,
    TransactionComponent,
    SubscriptionComponent,
    MySubComponent,
    VacationComponent,
    AddVacComponent,
    AccountsComponent,
    AppGuideComponent,
    NeedHelpComponent,
    UserProfileComponent,
    LocationComponent,
    OffersComponent,
    UserProfileComponent,
    ReferComponent
  
  ],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatStepperModule,
    MatMenuModule ,
    MatSlideToggleModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule, 
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatIconModule,
    NgbModule,
    ReactiveFormsModule
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
