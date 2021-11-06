import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/models/AppEnums';
import { IUser } from 'src/app/models/iuser';
import { AppService } from 'src/app/service/app-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading:boolean = false;
  authuser?: IUser;
  constructor(private router:Router, private service: AppService,
      private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("",
          Validators.compose([Validators.requiredTrue, Validators.min(8),
          Validators.pattern('^[a-z]+$'), Validators.pattern('^[A-Z]+$'),
          Validators.pattern('^[0-9]+$')])),
    })
  }

  ngOnInit(): void {
    this.service.showToastMessage(AppEnums.ToastTypeError, "LOGIN","Kindly Login");
  }

  submitLoginData() {
    this.loading = true;
    this.service.makeLoginRequest(`${environment.LOGIN_URL}`, {
      email: this.loginForm.get("email")?.value,
      authToken: this.loginForm.get("password")?.value
    }).subscribe(data=>{
      if (data.status == 200) {
          this.loading = false;
          this.authuser = data.payload;
          this.service.showToastMessage(AppEnums.ToastTypeSuccess,
            "SUCCESS", "Welcome back, ");
          this.service.setAuthUser(this.authuser!);
          this.service.setSessionUser(this.authuser!)
          this.router.navigate(["/dashboard"])
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "LOG IN FAILED", data.payload.message);
      }

    });
  }

}
