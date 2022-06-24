import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId : String, page : number, size : number) : Observable<Account>
  {
    return this.http.get<Account>(environment.url+"accounts/"+accountId+"/pageoperations?page="+page+"&size="+size)
  }

  public debit(accountId : String, amount : number, desc : String) : Observable<any>
  {
    let data = {accountId : accountId, amount : amount, description : desc}
    
    return this.http.post(environment.url+"accounts/debit", data)
  }

  public credit(accountId : String, amount : number, desc : String) : Observable<any>
  {
    let data = {accountId : accountId, amount : amount, description : desc}
    return this.http.post(environment.url+"accounts/credit", data)
  }

  public transfer(accountIdS : String, accountIdD : String, amount : number, desc : String) : Observable<any>
  {
    let data = {accountSource : accountIdS, accountDestination : accountIdD, amount : amount, description : desc}
    return this.http.post(environment.url+"accounts/transfer", data)
  }

  public getCustomerAccounts(customerId : string) : Observable<Array<Account>>
  {
    
    return this.http.get<Array<Account>>(environment.url+"customers/" + customerId + "/accounts")
  }
  
}
