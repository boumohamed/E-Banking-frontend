import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/Customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.url+"customers")
  }

  public getCustomer(customerId : string) : Observable<Customer>{
    return this.http.get<Customer>(environment.url+"customers/" + customerId)
  }

  public searchCustomers(kw : string) : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.url+"customers/search?keyword="+kw)
  }

  public saveCustomer(customer : Customer) : Observable<Customer>{
    return this.http.post<Customer>(environment.url+"customers", customer)
  }

  public deleteCustomer(id : number){
    return this.http.delete(environment.url+"customers/"+id)
  }

  public updateCustomer(customer : Customer) : Observable<Customer>{
    return this.http.put<Customer>(environment.url+"customers/" + customer.id, customer)
  }
}
