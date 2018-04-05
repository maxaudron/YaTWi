import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService, ServerData } from '../services/api.service';
import { VirtualServerProperties } from '../services/types'
import { ServerIdService } from '../services/sid.service';

export class RegEx {}

@Component({
    selector: 'usermanagement',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.scss']
})

export class UserManagementComponent {
    sid: string;
    subscription:Subscription;
    // ServerData: any;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {}

	runOnce = 0
    clients: any = [];
	clientsonline: any = [];
    filteredItems: any = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid); this.sid = sid })
    }

    getData(sid) {
        this.apiService.post('clientdblist', sid, {'duration': '999'}).subscribe( (response) => {
            this.clients = response; this.assignCopy()
        })
		this.apiService.get('clientlist', sid).subscribe( response => {
			this.clientsonline = response 
		})
    }

    assignCopy(){
            this.filteredItems = Object.assign([], this.clients);
			this.checkOnline()
    }

    filterItem(value, col){
        if(!value) this.assignCopy(); //when nothing has typed 
        switch(col){
			case 'nick': {
				this.filteredItems = Object.assign([], this.clients).filter( 
				item => item.client_nickname.toLowerCase().indexOf(value.toLowerCase()) > -1)
			}
			case 'dbid': {
				this.filteredItems = Object.assign([], this.clients).filter( 
				item => item.cldbid.indexOf(value) > -1)
			}
			case 'uid': {
				this.filteredItems = Object.assign([], this.clients).filter( 
				item => item.client_unique_identifier.indexOf(value) > -1)
			}
		} 
    }

	checkOnline(){
		if (this.runOnce == 0) {
			console.log('starting')
			this.clientsonline.forEach(client => {
				var obj = this.clients.findIndex(function (obj) {
					return obj.cldbid === client.client_database_id 
				})
				if (obj > -1) {
					this.clients[obj].online = 'true'
				}
			})
			this.runOnce = 1
		}
	}
}
