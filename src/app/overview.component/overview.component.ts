import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => this.sid = sid)
    }

  data: Data[] = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid) })
    }

  getData(sid) {
    this.apiService.get('serverinfo', sid)
    .subscribe(
     response => this.data = response
   )
  }
}
