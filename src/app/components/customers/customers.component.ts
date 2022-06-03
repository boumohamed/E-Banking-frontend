import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';

import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers?: Observable<Array<Customer>>;
  displayedColumns: string[] = ['id', 'nom', 'email'];
  loading : boolean = true;
  errorMessage! : string
  customerGroup! : FormGroup;
  

 
  
  constructor(private customerService : CustomerService, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.customerGroup = this.fb.group({
      keyword : this.fb.control("")
    })

    this.handelForme()
  }

  handelForme()
  {
    let kw = this.customerGroup.value.keyword
    console.log(kw)
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )


    
  }

}
