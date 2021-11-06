import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/IAccount';
import { ITransaction } from 'src/app/models/ITransaction';
import { IUser } from 'src/app/models/iuser';
import { AppService } from 'src/app/service/app-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user?:IUser;
  account?: IAccount;
  loading:boolean = false;
  transactions? : ITransaction[];
  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUserDetails();

  }

  getUserDetails() {
    this.service.makePostRequest(`${environment.USER_DETAILS}`, {})
      .subscribe(data=>{
        if (data.status == 200) {
          this.user = data.payload;
        }
      })
      this.getAccountDetails();
  }

  getAccountDetails() {
    this.service.makePostRequest(`${environment.ACCOUNT_DETAILS}`, {})
    .subscribe(data=>{
      if (data.status == 200) {
        this.account = data.payload;
        console.log(data.payload.numberOfRefferals)
      }
    })
    this.getTransactions()
  }

  getInterest() {
    return 100 * (this.account!.amount - 0.0);
  }

  getTransactions() {
    this.service.makePostRequest(`${environment.TRANSACTION_DETAILS}`, {})
    .subscribe(data=>{
      this.loading = false;
      if (data.status == 200) {
        this.loading = false;
        this.transactions = data.payload.transactions;
      }
    })
  }
}