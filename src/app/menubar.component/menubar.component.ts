import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenuBarComponent {
  title = 'app works!';

  constructor(public authService: AuthService){}

  logout() {
    this.authService.logout();
  }
}
