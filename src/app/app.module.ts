

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { TapbarComponent } from './Components/tapbar/tapbar.component';
import { LoginComponent } from './Components/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginNextComponent } from './Components/login-next/login-next.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatRadioModule } from '@angular/material/radio';

import { WalletComponent } from './Components/wallet/wallet.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TapbarComponent,
    LoginComponent,
    LoginNextComponent,
    ProductDetailsComponent,
    WalletComponent,
    PaymentComponent
  ],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule, 
    MatRadioModule,
    NgbModule
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
