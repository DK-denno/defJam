import { Component, OnInit } from '@angular/core';
import { AppEnums } from 'src/app/models/AppEnums';
import { AppService } from 'src/app/service/app-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  loading:boolean = false;
  constructor(private service: AppService) { }

  ngOnInit(): void { }

  activateAccount() {
    this.loading = true;
    this.service.makePostRequest(`${environment.ACTIVATE_ACCOUNT}`, {})
      .subscribe(data=>{
      if (data.status == 200) {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeSuccess, "ACTIVATE", "Please wait for stk push");
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError, "ACTIVATE", data.payload.errorMessage);
      }
    })
  }

}
