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
}
