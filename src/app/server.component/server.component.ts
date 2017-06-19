import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class AppComponent {
    title = 'app works!';
    constructor(public apiService: ApiService) {}
}
