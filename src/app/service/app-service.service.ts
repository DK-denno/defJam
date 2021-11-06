import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../models/iuser';
import { ApiResponse } from '../models/ApiResponse';
import { AppEnums } from '../models/AppEnums';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'skey': 'my-auth-token',
    Accept: 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AppService {

  authUser!: IUser ;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.setAuthUser(this.getSessionUser());
  }

   /**
   * Get bearer token
   */
  public getBearerToken(): string {
    let idToken = null;

    if (this.getAuthUser()) {
      idToken = this.getAuthUser().token;
    } else {
      idToken = this.getSessionUser().token;
    }

    return idToken;
  }

  logout() {
    sessionStorage.removeItem('user');
  }

  setAuthUser(authUser: IUser) {
    this.authUser = authUser;
  }

  getAuthUser() {
    return this.authUser;
  }

  setSessionUser(authUser: IUser) {
    sessionStorage.setItem('user', JSON.stringify(authUser));
  }

  getSessionUser(): IUser {
    let userString = sessionStorage.getItem('user');
    let sessionUser: IUser = JSON.parse(userString!);
    return sessionUser;
  }

  makePostRequest(fullUrl: string, data: any): Observable<ApiResponse> {
    if (this.getAuthUser()) {
      httpOptions.headers = httpOptions.headers.set(
        'skey',
        this.getAuthUser().token
      );
    } else {
      httpOptions.headers = httpOptions.headers.set(
        'skey',
        this.getSessionUser().token
      );
    }
    return this.http.post<ApiResponse>(fullUrl, data, httpOptions);
  }

  makeCreateUserRequest(fullUrl: string, data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(fullUrl, data, httpOptions);
  }

  makeLoginRequest(fullUrl: string, data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(fullUrl, data, httpOptions);
  }

  makeGetRequest(fullUrl: string): Observable<ApiResponse> {
    if (this.getAuthUser()) {
      httpOptions.headers = httpOptions.headers.set(
        'skey',
        this.getAuthUser().token
      );
    } else {
      httpOptions.headers = httpOptions.headers.set(
        'skey',
        this.getSessionUser().token
      );
    }
    return this.http.get<ApiResponse>(fullUrl, httpOptions);
  }


  public showToastMessage(alertType: AppEnums, alertTitle:
      string, alertMessage: string) {
    switch (alertType) {
      case AppEnums.ToastTypeSuccess:
        return this.toastr.success(alertMessage, alertTitle);
        break;
      case AppEnums.ToastTypeInfo:
        return this.toastr.info(alertMessage, alertTitle);
        break;
      case AppEnums.ToastTypeWarning:
        return this.toastr.warning(alertMessage, alertTitle);
        break;
      case AppEnums.ToastTypeError:
        return this.toastr.error(alertMessage, alertTitle);
        break;
    }
  }

}
