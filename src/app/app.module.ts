import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarHomepageComponent } from './components/navbar-homepage/navbar-homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { FooterDashboardComponent } from './components/dashboard/footer-dashboard/footer-dashboard.component';
import { ReferralsComponent } from './components/dashboard/referrals/referrals.component';
import { ActivateAccountComponent } from './components/dashboard/activate-account/activate-account.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingConfig, NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ReferRegisterComponent } from './components/refer-register/refer-register.component';

const ngxLoadingConfig: NgxLoadingConfig = {
  animationType: ngxLoadingAnimationTypes.wanderingCubes,
  // backdropBackgroundColour: 'rgba(0,0,0,0.1)',
  backdropBackgroundColour: 'rgba(0, 0, 0, .9)',
  backdropBorderRadius: '4px',
  primaryColour: '#dba622',
  secondaryColour: '#dba622',
  tertiaryColour: '#ffffff',
  fullScreenBackdrop: true,
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    FooterComponent,
    NavbarHomepageComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterDashboardComponent,
    ReferralsComponent,
    ActivateAccountComponent,
    PageNotFoundComponent,
    ReferRegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, FormsModule,
    NgxLoadingModule.forRoot(ngxLoadingConfig),
    ReactiveFormsModule, ToastrModule.forRoot({
      positionClass :'toast-top-right',
      timeOut:3000
    })],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
