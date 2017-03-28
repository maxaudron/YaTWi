import { Component } from '@angular/core';

import { OverviewComponent } from '../overview.component/overview.component';

@Component({
  selector: 'dashboard',
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'app works!';
}
