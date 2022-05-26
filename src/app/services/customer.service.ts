import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = "http://localhost:8080/"
  constructor(private http: HttpClient) { }

  public getCustomers() : Observable<any>{
    return this.http.get(this.url+"customers")
  }
}
