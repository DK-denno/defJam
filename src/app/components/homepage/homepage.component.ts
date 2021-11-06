import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router, private service: AppService) {
    if (this.service.getAuthUser() != null) {
        this.router.navigate(["/dashboard"]);
    }

  }

  ngOnInit(): void {
  }

}
