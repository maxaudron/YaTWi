import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { ApiService, Data } from '../services/api.service';

export class RegEx {}

@Component({
  selector: 'serverview',
  templateUrl: './serverview.component.html',
  styleUrls: ['./serverview.component.scss']
})

export class ServerviewComponent {
    constructor(public apiService: ApiService) {}
    channels: Data[] = [];
    clients: Data[] = [];
	regex: RegEx = '/(\[.*?spacer.*?\])+/';

    ngOnInit() { this.getData() }
    getData() {
        this.apiService.get('channellist').subscribe( response => this.channels = response )
        this.apiService.get('clientlist').subscribe( response => this.clients = response )
    }
	regtest(channelname) {
		var res = /(\[.*?spacer.*?\])+/g.test(channelname);
		return res;
	}
	regstrip(channelname) {
		var res = channelname.replace(/(\[.*?spacer.*?\])+/g, "");
		return res
	}
}
