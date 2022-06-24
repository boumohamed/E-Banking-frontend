import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { Customer } from '../models/Customer';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId! : string;
  customer! :  Customer;
  customerAccounts$? : Observable<Array<Account>>;
  constructor(private route : ActivatedRoute, private router : Router, private accountService : AccountService, private customerService : CustomerService) {
    //this.customer = this.router.getCurrentNavigation()?.extras.state as Customer
   }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params["id"]

    this.customerAccounts$ = this.accountService.getCustomerAccounts(this.customerId)
    this.customerService.getCustomer(this.customerId).subscribe({
      next : data => {
        this.customer = data
      },
      error : err => {
        console.log(err)
      }
    })

  }

  handlOperations(account : Account)
  {
    let accoundId = account.id
    this.router.navigateByUrl("accounts/" + accoundId)
  }
}
