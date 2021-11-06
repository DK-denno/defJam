import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AppEnums } from 'src/app/models/AppEnums';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iuser';
import { AppService } from 'src/app/service/app-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refer-register',
  templateUrl: './refer-register.component.html',
  styleUrls: ['./refer-register.component.css']
})
export class ReferRegisterComponent implements OnInit {

  regForm! : FormGroup;
  authuser?: IUser;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder, private appService: AppService,
      private router: Router) {
      this.regForm = formBuilder.group({
        firstName: new FormControl("", Validators.requiredTrue),
        middleName: new FormControl("", Validators.requiredTrue),
        userName: new FormControl("", Validators.requiredTrue),
        lastName: new FormControl("", Validators.requiredTrue),
        email: new FormControl("", Validators.compose([Validators.requiredTrue, Validators.email])),
        password: new FormControl("",
          Validators.compose([Validators.requiredTrue, Validators.min(8),
          Validators.pattern('^[a-z]+$'), Validators.pattern('^[A-Z]+$'),
          Validators.pattern('^[0-9]+$')])),
        validatePassword: new FormControl("", Validators.requiredTrue),
        isTermsAccepted: new FormControl(Validators.requiredTrue),
        telephone1: new FormControl("", Validators.requiredTrue),
        addr: new FormControl("", Validators.requiredTrue),
      })
  }


  ngOnInit(): void { }

  submitRegistrationData() {
    this.loading = true;
    if (this.regForm.get("password")?.value === this.regForm.get("validatePassword")?.value) {
      this.appService.makeCreateUserRequest(`${environment.REFERRAL_REGISTRATION_URL}` + this.router.url.split("/")[2], {
        username:this.regForm.get("userName")?.value,
        firstName:this.regForm.get("firstName")?.value,
        lastName:this.regForm.get("lastName")?.value,
        email:this.regForm.get("email")?.value,
        authtoken:this.regForm.get("password")?.value,
        telephone1:this.regForm.get("telephone1")?.value,
        addr:this.regForm.get("addr")?.value,
        isTermsAccepted:this.regForm.get("isTermsAccepted")?.value
      }).subscribe(data=>{
        console.log("data -----> " + data.payload)
        if (data.status == 200) {
          this.loading = false;
          this.appService.showToastMessage(AppEnums.ToastTypeSuccess,
              "LOGGED IN", "Account Created succesffully");
          this.authuser = data.payload;
          this.appService.setAuthUser(this.authuser!);
          this.appService.setSessionUser(this.authuser!)
          this.router.navigate(["/activate-account"])
        } else {
          this.loading = false;
          this.appService.showToastMessage(AppEnums.ToastTypeError,
              "LOGGING IN", data.payload);
        }
      })
    } else {
      this.loading = false
      this.appService.showToastMessage(AppEnums.ToastTypeError,
        "LOGGING IN", "Password and Validate Passsowrd Should Match");
    }
  }

}
