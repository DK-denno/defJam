import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/models/AppEnums';
import { AppointmentOptions } from 'src/app/models/AppointmentOptions';
import { IAppointments } from 'src/app/models/IAppointments';
import { IReviews } from 'src/app/models/IReviews';
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
  loading:boolean = false;
  appointments!: IAppointments []
  appointmentForm!: FormGroup;
  initiatePaymentForm!: FormGroup;
  creatPatientRecordForm!: FormGroup;
  reviews!: IReviews [];
  options: AppointmentOptions[]= [
    { value: 'Consultation', viewValue: 'Consultation' },
    { value: 'Optical', viewValue: 'Optical' },
    { value: 'Dental', viewValue: 'Dental' },
  ];
  client!:IUser;
  constructor(private router:Router, private service: AppService,
    private formBuilder: FormBuilder) {
      this.appointmentForm = formBuilder.group({
        message: new FormControl("", Validators.required),
        doctorName : new FormControl("", Validators.required),
        day : new FormControl("", Validators.required),
        month : new FormControl("", Validators.required),
        year : new FormControl("", Validators.required),
      });

      this.creatPatientRecordForm = formBuilder.group({
        message: new FormControl("", Validators.required),
      });

      this.client = this.service.getAuthUser();
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
      this.getAppointMents();
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
    this.loading = true;
    this.service.makeLoginRequest(`${environment.GET_APPOINTMENTS}`, {
    }).subscribe(data=>{
      if (data.status == 200) {
          this.loading = false;
          this.appointments = data.payload.appointments;
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "FAILED", data.payload.message);
      }
    });
    this.getReviews();
  }

  createPatientRecord(appointMentID:number) {
    console.log(appointMentID)
    this.service.makePostRequest(`${environment.CREATE_PATIENT_RECORD}`, {
      appointmentId: appointMentID,
      message: this.creatPatientRecordForm.get("message")?.value,
    }).subscribe(data=>{
      if (data.status == 200) {
          this.loading = false;
          this.service.showToastMessage(AppEnums.ToastTypeSuccess,
            "SUCCESS", "Patient record added");
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "FAILED", data.payload.message);
      }
    });
  }

  getPatientRecord(appointMentID:number) {
    this.loading = true;
    console.log(appointMentID)
    this.service.makePostRequest(`${environment.CREATE_PATIENT_RECORD}`, {
      appointmentId: appointMentID,
    }).subscribe(data=>{
      if (data.status == 200) {
          this.loading = false;
          this.service.showToastMessage(AppEnums.ToastTypeSuccess,
            "SUCCESS", "Patient record added");
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "FAILED", data.payload.message);
      }
    });
  }

  getReviews() {
    this.loading = true;
    this.service.makePostRequest(`${environment.GET_REVIEW}`, {
    }).subscribe(data=>{
      if (data.status == 200) {
          this.loading = false
          this.reviews = data.payload.reviews;
      } else {
        this.loading = false;
        this.service.showToastMessage(AppEnums.ToastTypeError,
          "FAILED", data.payload.message);
      }
    });
  }

}
