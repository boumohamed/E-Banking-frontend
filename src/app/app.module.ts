import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card'
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CustomersComponent } from './components/customers/customers.component'
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './services/customer.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AccountsComponent,
    CustomersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    BrowserModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatToolbarModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
