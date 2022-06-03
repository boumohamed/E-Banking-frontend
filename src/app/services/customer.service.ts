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

  public searchCustomers(kw : string) : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.url+"customers/search?keyword="+kw)
  }
}
