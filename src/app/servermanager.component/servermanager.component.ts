import { Component } from '@angular/core';
import { Subscription } from 'rxjs'
import { Router }      from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { ApiService, Data } from '../services/api.service';
import { ServerIdService } from '../services/sid.service';

export class createServerProps {
	virtualserver_name: string
	virtualserver_port: string
	virtualserver_autostart: string = '1'
	virtualserver_maxclients: string = '25'
}

@Component({
    selector: 'servermanager',
    templateUrl: './servermanager.component.html',
    styleUrls: ['./servermanager.component.scss']
})
export class ServerManagerComponent {
	constructor(public apiService: ApiService, private serverIdService: ServerIdService, private modalService: NgbModal) {}
	subscription: Subscription
    servers: Data[] = [];
	cserver = new createServerProps;
	sid: string
	closeResult: string


    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid); this.sid = sid })
    }

	btnModal(modal) {
		this.modalService.open(modal, { centered: true, size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = 'dismissed ${this.getDismissReason(reason)}'
		})
	}

    selectServer(item: string) {
        console.log('selected nav item ' + item);
        this.serverIdService.announceSid(item);
    }

    startServer(sid: string) {
        this.apiService.post('serverstart', this.sid, {sid: sid})
            .subscribe(
                response => {this.getData(this.sid)}
            )
    }

    stopServer(sid: string) {
        this.apiService.post('serverstop', this.sid, {sid: sid})
            .subscribe(
                response => {this.getData(this.sid)}
            )
    }

    deleteServer(data) {
		if(confirm('Really delete server: ' + name)) {
			if(data.virtualserver_status == 'online') {
				this.apiService.post('serverstop', this.sid, {sid: data.virtualserver_id})
					.subscribe(
						res => { this.apiService.post('serverdelete', this.sid, {sid: data.virtualserver_id})
									.subscribe(
										response => {this.getData(this.sid)}
									)
								}
					)
			} else {
				this.apiService.post('serverdelete', this.sid, {sid: data.virtualserver_id})
					.subscribe(
						response => {this.getData(this.sid)}
					)
			}
		}
	}
    

    createServer(data: createServerProps) {
        this.apiService.post('servercreate', this.sid, data)
            .subscribe(
                response => {this.getData(this.sid)}
            ) 
    }

    getData(sid) {
        this.apiService.get('serverlist', sid)
            .subscribe(
                response => this.servers = response
            )
    }
}
