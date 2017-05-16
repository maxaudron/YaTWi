import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService, ServerData } from '../services/api.service';
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
    ServerData: any;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => this.sid = sid)
    }

    data: ServerData[] = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid) })
        this.getData(this.sid)
    }

    getData(sid) {
        this.apiService.getServerInfo('serverinfo', sid).subscribe( response => this.data = response )
    }

    saveData(data) {
        console.log(data)
        this.apiService.postServer(this.sid, 'serveredit', {
            virtualserver_name: data.virtualserver_name,
            virtualserver_welcomemessage: data.virtualserver_welcomemessage,
            virtualserver_maxclients: data.virtualserver_maxclients,
            virtualserver_reserved_slots: data.virtualserver_reserved_slots,
            virtualserver_password: data.virtualserver_password,
            virtualserver_hostbanner_url: data.virtualserver_hostbanner_url,
            virtualserver_hostbanner_gfx_url: data.virtualserver_hostbanner_gfx_url,
            virtualserver_hostbanner_gfx_interval: data.virtualserver_hostbanner_gfx_interval,
            virtualserver_hostbutton_url: data.virtualserver_hostbutton_url,
            virtualserver_hostbutton_gfx_url: data.virtualserver_hostbutton_gfx_url,
            virtualserver_hostbutton_tooltip: data.virtualserver_hostbutton_tooltip,
			virtualserver_download_quota: data.virtualserver_download_quota,
			virtualserver_upload_quota: data.virtualserver_upload_quota,
			virtualserver_max_download_total_bandwidth: data.virtualserver_max_download_total_bandwidth,
			virtualserver_max_upload_total_bandwidth: data.virtualserver_max_upload_total_bandwidth
        })
        .subscribe()
    }
}
