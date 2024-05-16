import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { LoginNextComponent } from './Components/login-next/login-next.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WalletComponent } from './Components/wallet/wallet.component';
import { PaymentComponent } from './Components/payment/payment.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
 
  { path: 'login-next', component: LoginNextComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'product-details/:index', component: ProductDetailsComponent },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }