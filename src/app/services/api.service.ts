
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router'

import { AuthService } from './auth.service'
import { AppConfig } from '../app.config';

export class Data {

}

export class Error {
	status: number
	message: string
}

export interface ServerData {
    virtualserver_name: string
    virtualserver_welcomemessage: string
    virtualserver_maxclients: number
    virtualserver_password: string
    virtualserver_hostbanner_url: string
    virtualserver_hostbanner_gfx_url: string
    virtualserver_hostbanner_gfx_interval: number
    virtualserver_hostbutton_url: string
    virtualserver_hostbutton_gfx_url: string
    virtualserver_hostbutton_tooltip: string
    virtualserver_download_quota: number
    virtualserver_upload_quota: number
    virtualserver_max_download_total_bandwidth: number
    virtualserver_max_upload_total_bandwidth: number
    virtualserver_default_server_group: number
    virtualserver_default_channel_group: number
    virtualserver_default_channel_admin_group: number
    virtualserver_complain_autoban_count: number
    virtualserver_complain_autoban_time: number
    virtualserver_complain_remove_time: number
    virtualserver_log_client: number
    virtualserver_log_server: number
    virtualserver_log_query: number
    virtualserver_log_permissions: number
    virtualserver_log_channel: number
    virtualserver_log_filetransfer: number
}

@Injectable()
export class ApiService {
    constructor(private http: HttpClient, private config: AppConfig, private auth: AuthService, private router: Router) { }

    private apiGet = this.config.getConfig('api_url') + '/api/get/';
    private apiPost = this.config.getConfig('api_url') + '/api/post/';

    get(action, sid): Observable<Data[]> {
        var token = JSON.parse(localStorage.getItem('id_token')).token
		const httpOptions = {
			headers: new HttpHeaders({
				'sid': sid,
				'Authorization': 'Bearer ' + JSON.stringify(token)
			})
		}

        return this.http
        .get<Data[]>(this.apiGet + action, httpOptions)
        .catch(error => this.handleError(error));
    }

    post(action, sid, data): Observable<Data[]> {
        console.log('posting')
        var token = JSON.parse(localStorage.getItem('id_token')).token
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'sid': sid,
				'Authorization': 'Bearer ' + JSON.stringify(token)
			})
		}

        return this.http
        .post<Data[]>(this.apiPost + action, JSON.stringify(data), httpOptions)
        .catch(error => this.handleError(error))
    }

    // localStorage.setItem('id_token', JSON.stringify({ token: body.token }));
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || {};
    }

    private handleError(this, error: Error ) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error.status === 401) {
			this.auth.logout()
			this.router.navigate(['/login'])
		} else if (error instanceof Response) {
            const body = error.json() || '';
            const err = error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return observableThrowError(errMsg);
    }
}
