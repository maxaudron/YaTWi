import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';

export class LoginData {
  constructor(
    public username: string,
    public password: string
  ) { }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.loggedIn ? 'in' : 'out');
  }

  model = new LoginData('', '');

  login() {
    this.message = 'Trying to log in ...';
    this.authService.login(this.model).subscribe(() => {
      this.setMessage();
      if (this.authService.loggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
