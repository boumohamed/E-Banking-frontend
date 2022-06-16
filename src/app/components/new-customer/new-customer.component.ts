import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  customerGroup! : FormGroup;
  constructor(private customerService : CustomerService, private fb : FormBuilder,
              private router : Router) { }

  ngOnInit(): void {
    this.customerGroup = this.fb.group({
      nom : this.fb.control("", [Validators.required]),
      email : this.fb.control("", [Validators.email, Validators.required])
    })
  }

  handelForme()
  {
    let customer : Customer = this.customerGroup.value;
    //console.log(customer)

    this.customerService.saveCustomer(customer).subscribe({
      next : data => {
        alert("Customer saved !")
        // this.customerGroup.reset();
        this.router.navigate(["/customers"]);
      },
      error : er => {
        alert("Something went wrong !")
      }
    });
  }

}
