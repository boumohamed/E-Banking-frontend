import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

const routes: Routes = [
  {path:'', component: CustomersComponent},
  {path:'accounts', component: AccountsComponent},
  {path:'accounts/:id', component: AccountsComponent},
  {path:'customers', component: CustomersComponent},
  {path:'customers/update/:id', component: UpdateCustomerComponent},
  {path:'customers/add', component: NewCustomerComponent},
  {path:'customers/:id/accounts', component: CustomerAccountsComponent},
  {path:'**', component: CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
