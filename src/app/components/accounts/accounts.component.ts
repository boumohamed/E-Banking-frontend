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
  OperationsGroup! : FormGroup;
  Account$? : Observable<Account>;
  currentPage : number = 0;
  pageSize : number = 5;
  constructor(private fb : FormBuilder, private accountService : AccountService) { }


  ngOnInit(): void {
    this.AccountGroup = this.fb.group({
      accountId : this.fb.control("")
    })
    this.OperationsGroup = this.fb.group({
      operationType : this.fb.control("Credit"),
      amount : this.fb.control(0),
      accountIdDestination : this.fb.control(""),
      description : this.fb.control("")
    })
  }

  goToPage(page : number)
  {
    this.currentPage = page;
    this.handelForme();
  }

  handleOperationForm()
  {
    //console.log(this.OperationsGroup.value)
    let accountId = this.AccountGroup.value.accountId;
  }

  handelForme()
  {
    let accountId = this.AccountGroup.value.accountId
    this.Account$ = this.accountService.getAccount(accountId, this.currentPage, this.pageSize)
  }

}
