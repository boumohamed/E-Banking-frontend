import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  AccountGroup! : FormGroup;
  Account$? : Observable<Account>;
  currentPage : number = 0;
  pageSize : number = 5;
  constructor(private fb : FormBuilder, private accountService : AccountService) { }


  ngOnInit(): void {
    this.AccountGroup = this.fb.group({
      accountId : this.fb.control("")
    })
  }

  handelForme()
  {
    let accountId = this.AccountGroup.value.accountId
    this.Account$ = this.accountService.getAccount(accountId, this.currentPage, this.pageSize)
  }

}
