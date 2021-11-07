// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // REGISTRATION_URL : "https://jadi-earn.herokuapp.com/auth/clientSelfSignUp",
  // LOGIN_URL : "https://jadi-earn.herokuapp.com/auth/clientLogin",
  USER_DETAILS : "http://localhost:8080/auth/getUserDetails",
  ACTIVATE_ACCOUNT : "https://jadi-earn.herokuapp.com/auth/activateAccount",
  ACCOUNT_DETAILS: "https://jadi-earn.herokuapp.com/auth/getAccountDetails",
  TRANSACTION_DETAILS: "https://jadi-earn.herokuapp.com/auth/getTransactions",
  REFERRAL_REGISTRATION_URL : "https://jadi-earn.herokuapp.com/auth/clientSignUp/",
  REGISTRATION_URL : "http://localhost:8080/auth/clientSignUp",
  LOGIN_URL : "http://localhost:8080/auth/login",
  SAVE_APPOINTMENT : "http://localhost:8080/doctors/saveAppointment",
  SAVE_DOCTORS : "http://localhost:8080/doctors/saveDoctors",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

