import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any;
  displayedColumns: string[] = ['id', 'nom', 'email'];
  loading : boolean = true;
  errorMessage! : string
  
  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next : (data) => {
        this.customers = data;
        this.loading = false
      },
      error : (err) =>
      {
        //console.log(err);
        this.loading = false
        this.errorMessage = err.message;
        console.log(err)
      }
       
    })
    
  }

}
