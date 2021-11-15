import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/models/AppEnums';
import { IRole } from 'src/app/models/IRoles';
import { IUser } from 'src/app/models/iuser';
import { AppService } from 'src/app/service/app-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  createDotorsForm!: FormGroup;
  initiatePaymentForm!: FormGroup;
  reviewForm!: FormGroup;
  addNeUserForm!: FormGroup;
  loading: boolean = false;
  user!:IUser;
  roles!: IRole [];

  constructor(private router:Router, private service: AppService,
    private formBuilder: FormBuilder) {
      this.createDotorsForm = formBuilder.group({
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

      this.initiatePaymentForm = formBuilder.group({
        phoneNumber: new FormControl("", Validators.required),
        amount: new FormControl("", Validators.required),
        accountNumber: new FormControl("", Validators.required),
      });

      this.reviewForm = formBuilder.group({
        message: new FormControl("", Validators.required)
      });

      this.addNeUserForm = formBuilder.group({
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
        role: new FormControl("", Validators.requiredTrue),
      });
      this.user = this.service.getAuthUser();
    }

  ngOnInit(): void {
    this.getRoles();
  }

  submitRegistrationData() {
    this.loading = true;
    if (this.createDotorsForm.get("password")?.value === this.createDotorsForm.get("validatePassword")?.value) {
      this.service.makeCreateUserRequest(`${environment.SAVE_DOCTORS}`, {
        username:this.createDotorsForm.get("userName")?.value,
        firstName:this.createDotorsForm.get("firstName")?.value,
        lastName:this.createDotorsForm.get("lastName")?.value,
        email:this.createDotorsForm.get("email")?.value,
        authToken:this.createDotorsForm.get("password")?.value,
        telephone1:this.createDotorsForm.get("telephone1")?.value,
        addr:this.createDotorsForm.get("addr")?.value,
      }).subscribe(data=>{
        console.log("data -----> " + data.payload)
        if (data.status == 200) {
          this.loading = false;
          this.service.showToastMessage(AppEnums.ToastTypeSuccess,
              "SUCCESS", "Doctor added successully");
          this.router.navigate(["/dashboard"])
        } else {
          this.loading = false;
          this.service.showToastMessage(AppEnums.ToastTypeError,
              "FAILED!", data.payload);
        }
      })
    }
  }

  initiatePayments() {
    this.loading = true;
    this.service.makeCreateUserRequest(`${environment.CHECKOUT}`, {
      phoneNumber:this.initiatePaymentForm.get("phoneNumber")?.value,
      amount: Number(this.initiatePaymentForm.get("amount")?.value),
      accountNumber:this.initiatePaymentForm.get("accountNumber")?.value,
    }).subscribe(data=>{
      console.log("data -----> " + data.payload)
      if (data.status == 200) {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeSuccess,
            "SUCCESS", "Payment Initiated Check for STK push");
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
            "FAILED", data.payload);
      }
    })
  }

  addReviews() {
    this.loading = true;
    this.service.makePostRequest(`${environment.ADD_REVIEW}`, {
      message: this.reviewForm.get("message")?.value,
    }).subscribe(data=>{
      console.log("data -----> " + data.payload)
      if (data.status == 200) {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeSuccess,
            "SUCCESS", "Review Made");
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
            "FAILED", data.payload);
      }
    })
  }

  getRoles() {
    this.service.makeGetRequest(`${environment.GET_ROLES}`)
    .subscribe(data=>{
      if (data.status == 200) {
          this.loading = false
          console.log(data.payload.roles);
          this.roles = data.payload.roles;
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "FAILED", data.payload.message);
      }
    });
  }
}