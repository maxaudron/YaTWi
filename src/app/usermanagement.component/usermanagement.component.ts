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

    data: any = [];
    filteredItems: any = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid); this.sid = sid })
    }

    getData(sid) {
        this.apiService.post('clientdblist', sid, {'duration': '999'}).subscribe( (response) => {
            this.data = response; this.assignCopy()
        })
    }

    assignCopy(){
            this.filteredItems = Object.assign([], this.data);
    }

    filterItem(value){
        if(!value) this.assignCopy(); //when nothing has typed
        this.filteredItems = Object.assign([], this.data).filter(
            item => item.client_nickname.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
    }
}
