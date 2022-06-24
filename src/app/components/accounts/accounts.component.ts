import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, max, Observable, throwError } from 'rxjs';
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
  errorMessage! : string

  constructor(private fb : FormBuilder, private accountService : AccountService, private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.AccountGroup = this.fb.group({
      accountId : this.fb.control(this.route.snapshot.params["id"])
    })
    this.OperationsGroup = this.fb.group({
      operationType : this.fb.control("Credit"),
      amount : this.fb.control(0),
      accountIdDestination : this.fb.control(""),
      description : this.fb.control("")
    })
    if(this.route.snapshot.params["id"] !== null)
    {
      this.handelForme();
    }
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
    let operationType = this.OperationsGroup.value.operationType;
    let amount = this.OperationsGroup.value.amount;
    let accountIdDestination = this.OperationsGroup.value.accountIdDestination;
    
    
    if(operationType === "Credit")
    {
      this.accountService.credit(accountId, amount, "Credit Operation").subscribe({
        next : data => {
          alert("credit operation done successfuly")
          this.OperationsGroup.reset();
          this.handelForme()
        },
        error : err => {
          console.log(err)
        }
      })
    }
    else if(operationType === "Debit")
    {
      this.accountService.debit(accountId, amount, "Depit Operation").subscribe({
        next : data => {
          alert("debit operation done successfuly")
          this.OperationsGroup.reset();
          this.handelForme()
        },
        error : err => {
          console.log(err)
        }
      })
    }
    else if(operationType === "Transfer")
    {
      
      this.accountService.transfer(accountId, accountIdDestination, amount, "Trasfer from : " + accountId +
                                    " To : " + accountIdDestination + ", Amount : " + amount + " Mad").subscribe({
        next : data => {
          alert("Transfer operation done successfuly")
          this.OperationsGroup.reset();
          this.handelForme()

        },
        error : err => {
          console.log(err)
        }
      })
    }
    
    
  }

  handelForme()
  {
    let accountId = this.AccountGroup.value.accountId
    this.Account$ = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )
  }

}
