import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

    constructor(public apiService: ApiService, private serverIdService: ServerIdService, private modalService: NgbModal) {}

	closeResult: string;
	runOnce = 0
    clients: any = [];
	modalc: any = []
    sorted: any = [];
	clientsonline: any = [];
    filteredItems: any = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid); this.sid = sid })
		
    }

    getData(sid) {
        this.apiService.post('clientdblist', sid, {'duration': '999'}).subscribe( (response) => {
			response = response.map(function(o) {
				o['online'] = 'false'
				return o
			})
            this.clients = response; this.assignCopy();
			this.sortData({sortColumn: 'online', sortDirection: 'desc'})
        })
		this.apiService.get('clientlist', sid).subscribe( response => {
			this.clientsonline = response 
		})
    }
	
	sortDataBack(criteria: ClientCriteria): Client[] {
        return this.clients.sort((a,b) => {
          if(criteria.sortDirection === 'desc'){
            return a[criteria.sortColumn] < b[criteria.sortColumn];
          }
          else {
            return a[criteria.sortColumn] > b[criteria.sortColumn];
          }
        });
    }

	sortData(criteria: ClientCriteria) {
		this.filteredItems = this.clients.sort((a,b) => {
          if(criteria.sortDirection === 'desc'){
            return a[criteria.sortColumn] < b[criteria.sortColumn];
          }
          else {
            return a[criteria.sortColumn] > b[criteria.sortColumn];
          }
        });
		console.log(this.filteredItems)
	}

	onSorted($event) {
		console.log($event)
		this.sortData($event)
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

	btnMenu(clientInfo, client) {
		this.modalc = client
		this.modalService.open(clientInfo).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = 'dismissed ${this.getDismissReason(reason)}'
		})
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}
}

export class Client {
	cldbid: number;
	client_created: number;
	client_description: string;
	client_lastconnected: number;
	client_lastip: string;
	client_nickname: string;
	client_totalconnections: string;
	client_unique_identifier: string;
	online: string;
}

export class ClientCriteria {
	sortColumn: string;
	sortDirection: string;
}
