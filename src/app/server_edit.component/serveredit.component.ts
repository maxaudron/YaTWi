import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService, Data } from '../services/api.service';
import { ServerIdService } from '../services/sid.service';

export class RegEx {}

@Component({
  selector: 'serveredit',
  templateUrl: './serveredit.component.html',
  styleUrls: ['./serveredit.component.scss']
})

export class ServerEditComponent {
    sid: string;
    subscription:Subscription;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => this.sid = sid)
    }

    data: Data[] = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid) })
        this.getData(this.sid)
    }

    getData(sid) {
        this.apiService.get('serverinfo', sid).subscribe( response => this.data = response )
    }
}
