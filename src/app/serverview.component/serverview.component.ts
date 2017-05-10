import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService, Data } from '../services/api.service';
import { ServerIdService } from '../services/sid.service';

export class RegEx {}

@Component({
  selector: 'serverview',
  templateUrl: './serverview.component.html',
  styleUrls: ['./serverview.component.scss']
})

export class ServerviewComponent {
    sid: string;
    subscription:Subscription;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => this.sid = sid)
    }
    channels: Data[] = [];
    clients: Data[] = [];
	regex: RegEx = '/(\[.*?spacer.*?\])+/';

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid) })
    }
    getData(sid) {
        this.apiService.get('channellist', sid).subscribe( response => this.channels = response )
        this.apiService.get('clientlist', sid).subscribe( response => this.clients = response )
    }
	regtest(channelname) {
		var res = /(\[.*?spacer.*?\])+/g.test(channelname);
		return res;
	}
	regstrip(channelname) {
		var res = channelname.replace(/(\[.*?spacer.*?\])+/g, "");
        console.log(res)
		return res
	}

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }
}
