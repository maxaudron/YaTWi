import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService, Data } from '../services/api.service';
import { ServerIdService } from '../services/sid.service';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    sid: string;
    subscription: Subscription;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {}

    data = {};

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid); this.sid = sid })
    }

  getData(sid) {
    this.apiService.get('serverinfo', sid)
    .subscribe(
     response => this.data = response[0]
   )
  }
	convert(num) {
		return Math.round(num / 1048576).toFixed(2)
	}
}
