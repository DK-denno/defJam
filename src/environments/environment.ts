// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USER_DETAILS : "http://localhost:8080/auth/getUserDetails",
  ACTIVATE_ACCOUNT : "",
  ACCOUNT_DETAILS: "",
  TRANSACTION_DETAILS: "",
  REFERRAL_REGISTRATION_URL : "",
  REGISTRATION_URL : "http://localhost:8080/auth/clientSignUp",
  LOGIN_URL : "http://localhost:8080/auth/login",
  SAVE_APPOINTMENT : "http://localhost:8080/doctors/saveAppointment",
  SAVE_DOCTORS : "http://localhost:8080/doctors/saveDoctors",
  GET_APPOINTMENTS : "http://localhost:8080/doctors/getAppointments",
  CHECKOUT : "http://localhost:8080/checkout/pay",
  CREATE_PATIENT_RECORD : "http://localhost:8080/doctors/createPatientRecord",
  GET_PATIENT_RECORD : "http://localhost:8080/doctors/getPatientRecord",
  ADD_REVIEW : "http://localhost:8080/doctors/addReviews",
  GET_REVIEW : "http://localhost:8080/doctors/getReviews",
  GET_ROLES : "http://localhost:8080/admin/getRoles",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

