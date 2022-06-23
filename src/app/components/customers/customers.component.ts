import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers?: Observable<Array<Customer>>;
  
  loading : boolean = true;
  errorMessage! : string
  customerGroup! : FormGroup;
  

 
  
  constructor(private customerService : CustomerService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {

    this.customerGroup = this.fb.group({
      keyword : this.fb.control("")
    })

    this.handelForme()
  }

  deleteCustomer(c : Customer)
  {
    let sure = confirm("Are You Sure ?")
    //console.log(c)
    if(!sure) return

    this.customerService.deleteCustomer(c.id).subscribe({
      next : data => {
        //this.handelForme()
        this.customers = this.customers?.pipe(
          map(data => {
            return data;
          })
        )

      },
      error : err => {
        console.log(err )
      }
    })
  }

  handelForme()
  {
    let kw = this.customerGroup.value.keyword
    //console.log(kw)
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )    
  }

  customerAccounts(customer : Customer)
  {
    let id = customer.id;
    this.router.navigateByUrl("/customers/" + id + "/accounts", {state : customer})
  }

  updateCustomer(customer : Customer)
  {
    let id = customer.id;
    this.router.navigateByUrl("/customers/update/"  + id);
  }

}
