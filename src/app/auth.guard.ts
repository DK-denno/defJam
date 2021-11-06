import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppEnums } from './models/AppEnums';
import { AppService } from './service/app-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: AppService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.service.getSessionUser() != null ||
        this.service.getSessionUser() != undefined && this.service.getSessionUser().token != null) {
        return true;
      } else {
        this.router.navigate(["/login"])
        return false;
      }
  }
}