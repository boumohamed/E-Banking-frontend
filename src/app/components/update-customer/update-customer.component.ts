import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customerGroup! : FormGroup;
  loading : boolean = true;
  customerToUpdate! : Customer;
  constructor(private customerService : CustomerService, private fb : FormBuilder,
              private router : Router, private route : ActivatedRoute) { }



  ngOnInit(): void {
    this.loading = true;
    this.getCustomer();
    
    
  }

  handelForme()
  {
    let customer : Customer = this.customerGroup.value;

    this.customerService.updateCustomer(customer).subscribe({
      next : data => {
        
        alert("Customer updated !")
        // this.customerGroup.reset();
        this.router.navigate(["/customers"]);
      },
      error : er => {
        alert("Something went wrong !")
      }
    });
  }
  getCustomer()
  {
    this.customerService.getCustomer(this.route.snapshot.params["id"]).subscribe({
      next : data => {
        this.loading = false;
        this.customerToUpdate = data
        this.formGroupCreation()
      },
      error : err => {
        console.log(err)
      }
    })
  }

  formGroupCreation()
  {
    this.customerGroup = this.fb.group({
      id : this.fb.control(this.customerToUpdate.id),
      nom : this.fb.control(this.customerToUpdate.nom, [Validators.required]),
      email : this.fb.control(this.customerToUpdate.email, [Validators.email, Validators.required])
    })
  }

}
