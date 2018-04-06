import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component/app.component';
import { MenuBarComponent } from './menubar.component/menubar.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { OverviewComponent } from './overview.component/overview.component';
import { LoginComponent } from './login.component/login.component';
import { ServerviewComponent } from './serverview.component/serverview.component';
import { ServerEditComponent } from './server_edit.component/serveredit.component';
import { ServerSwitcherComponent } from './server_switcher.component/server_switcher.component'
import { UserManagementComponent } from './usermanagement.component/usermanagement.component'

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { CookieService } from './services/cookie.service';
import { ApiService } from './services/api.service';
import { ServerIdService } from './services/sid.service';

import { SortService } from './sortable.component/sort.service';
import { SortableTableDirective } from './sortable.component/sortable.directive';
import { SortableColumnComponent } from './sortable.component/sortable-column.component';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig }       from './app.config';

@NgModule({
    declarations: [
        AppComponent,
        MenuBarComponent,
        DashboardComponent,
        OverviewComponent,
        LoginComponent,
        ServerviewComponent,
        ServerEditComponent,
        ServerSwitcherComponent,
        UserManagementComponent,
		SortableTableDirective, 
		SortableColumnComponent
	],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
		NgxDatatableModule,
		NgbModule.forRoot(),
        RouterModule.forRoot([
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'editserver',
                component: ServerEditComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'usermanagement',
                component: UserManagementComponent,
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
        ServerIdService,
		AppConfig,
        { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
		SortService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
