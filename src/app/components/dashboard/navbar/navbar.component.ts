import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iuser';
import { AppService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?:IUser
  constructor(private service: AppService, private router: Router) {
    this.user = this.service.getAuthUser();
  }

  ngOnInit(): void { }

  logout() {
    this.service.logout();
    this.router.navigate(["/login"]);
  }
}