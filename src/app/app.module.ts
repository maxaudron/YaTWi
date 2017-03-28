import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component/app.component';
import { MenuBarComponent } from './menubar.component/menubar.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { OverviewComponent } from './overview.component/overview.component';
import { LoginComponent } from './login.component/login.component';
import { ServerviewComponent } from './serverview.component/serverview.component';
import { ServerEditComponent } from './server_edit.component/serveredit.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { CookieService } from './services/cookie.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    DashboardComponent,
    OverviewComponent,
    LoginComponent,
    ServerviewComponent,
    ServerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editserver',
        component: ServerEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ])
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
