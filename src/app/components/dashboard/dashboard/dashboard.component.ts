import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/models/AppEnums';
import { AppointmentOptions } from 'src/app/models/AppointmentOptions';
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
  appointmentForm!: FormGroup;

  options: AppointmentOptions[]= [
    { value: 'Consultation', viewValue: 'Consultation' },
    { value: 'Optical', viewValue: 'Optical' },
    { value: 'Dental', viewValue: 'Dental' },
  ];

  constructor(private router:Router, private service: AppService,
    private formBuilder: FormBuilder) {
      this.appointmentForm = formBuilder.group({
        message: new FormControl("", Validators.required),
        doctorName : new FormControl("", Validators.required),
        day : new FormControl("", Validators.required),
        month : new FormControl("", Validators.required),
        year : new FormControl("", Validators.required),
      });
    }

  ngOnInit(): void {
    this.loading = true;
    this.getUserDetails();

  }

  getUserDetails() {
    this.service.makePostRequest(`${environment.USER_DETAILS}`, {})
      .subscribe(data=>{
        if (data.status == 200) {
          this.loading = false;
          this.user = data.payload;
        }
      })
  }

  getInterest() {
    return 100 * (this.account!.amount - 0.0);
  }


  bookAppointment() {
    this.loading = true;
    this.service.makeLoginRequest(`${environment.SAVE_APPOINTMENT}`, {
      doctorName: this.appointmentForm.get("doctorName")?.value,
      message: this.appointmentForm.get("message")?.value,
      day: this.appointmentForm.get("day")?.value,
      month: this.appointmentForm.get("month")?.value,
      year: this.appointmentForm.get("year")?.value,
    }).subscribe(data=>{
      if (data.status == 200) {
          this.loading = false;
          this.service.showToastMessage(AppEnums.ToastTypeSuccess,
            "SUCCESS", "Appoinment Booked, ");
          this.router.navigate(["/dashboard"])
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "FAILED", data.payload.message);
      }

    });
  }

  getAppointMents() {

  }
}
