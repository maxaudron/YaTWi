import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService, ServerData } from '../services/api.service';
import { VirtualServerProperties } from '../services/types'
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
    // ServerData: any;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService) {}

    data: any = [];

    ngOnInit() {
        this.subscription = this.serverIdService.ServerId$
            .subscribe(sid => { this.getData(sid); this.sid = sid })
    }

    getData(sid) {
        this.apiService.get('serverinfo', sid).subscribe( (response) => {
            this.data = response[0]/*
			this.data.virtualserver_max_upload_total_bandwidth = this.cleanData(this.data.virtualserver_max_upload_total_bandwidth)
			this.data.virtualserver_max_download_total_bandwidth = this.cleanData(this.data.virtualserver_max_download_total_bandwidth)
			this.data.virtualserver_upload_quota = this.cleanData(this.data.virtualserver_upload_quota)
            this.data.virtualserver_download_quota = this.cleanData(this.data.virtualserver_download_quota)*/
		})
	}

	cleanData(cleandata) {
		switch (cleandata) {
			case false:
				return 0;
			case true:
				return 1;
			case 1:
				return 1;
			case 0:
				return 0;
			case 18446744073709552000:
				return -1;
		}
	}

    saveData(data) {

        console.log(data)
        this.apiService.post(this.sid, 'serveredit', {
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
            virtualserver_max_upload_total_bandwidth: data.virtualserver_max_upload_total_bandwidth,
            virtualserver_needed_identity_security_level: data.virtualserver_needed_identity_security_level,
            virtualserver_antiflood_points_tick_reduce: data.virtualserver_antiflood_points_tick_reduce,
            virtualserver_antiflood_points_needed_command_block: data.virtualserver_antiflood_points_needed_command_block,
            virtualserver_antiflood_points_needed_ip_block: data.virtualserver_antiflood_points_needed_ip_block,
            virtualserver_default_server_group: data.virtualserver_default_server_group,
            virtualserver_default_channel_group: data.virtualserver_default_channel_group,
            virtualserver_default_channel_admin_group: data.virtualserver_default_channel_admin_group,
            virtualserver_complain_autoban_count: data.virtualserver_complain_autoban_count,
            virtualserver_complain_autoban_time: data.virtualserver_complain_autoban_time,
            virtualserver_complain_remove_time: data.virtualserver_complain_remove_time,
            virtualserver_log_client: this.cleanData(data.virtualserver_log_client),
			virtualserver_log_server: this.cleanData(data.virtualserver_log_server),
			virtualserver_log_query: this.cleanData(data.virtualserver_log_query),
			virtualserver_log_permissions: this.cleanData(data.virtualserver_log_permissions),
			virtualserver_log_channel: this.cleanData(data.virtualserver_log_channel),
			virtualserver_log_filetransfer: this.cleanData(data.virtualserver_log_filetransfer),
        })
        .subscribe()
    }
}
