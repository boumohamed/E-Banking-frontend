import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = "http://localhost:8080/"
  constructor(private http: HttpClient) { }

  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.url+"customers")
  }
}
