import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WalletComponent } from './Components/wallet/wallet.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { WeeklyComponent } from './Components/weekly/weekly.component';
import { LoginNextComponent } from './Models/login/login/login-next/login-next.component';
import { LoginComponent } from './Models/login/login/login.component';
import { ProdSubsComponent } from './Components/prod-subs/prod-subs.component';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { BillsComponent } from './Components/bills/bills.component';
import { VacationComponent } from './Models/vacation/vacation/vacation.component';
import { AddVacComponent } from './Models/vacation/add-vac/add-vac.component';
import { SubscriptionComponent } from './Models/subscription/subscription/subscription.component';
import { MySubComponent } from './Models/subscription/my-sub/my-sub.component';
import { AccountsComponent } from './Models/User/accounts/accounts.component';
import { UserProfileComponent } from './Models/User/user-profile/user-profile.component';
import { AppGuideComponent } from './Models/User/app-guide/app-guide.component';
import { NeedHelpComponent } from './Models/User/need-help/need-help.component';
import { LocationComponent } from './Models/User/location/location.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
 
  { path: 'login-next', component: LoginNextComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vacation', component: VacationComponent },
  { path: 'add-vac', component: AddVacComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'my-sub', component: MySubComponent},
  { path: 'accounts', component: AccountsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'app-guide', component: AppGuideComponent },
  { path: 'need-help', component: NeedHelpComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'weekly', component: WeeklyComponent },
  { path: 'prod-subs', component: ProdSubsComponent},
  { path: 'payment', component: PaymentComponent },
  { path: 'product-details/:index', component: ProductDetailsComponent },
  { path: 'location', component: LocationComponent },

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }