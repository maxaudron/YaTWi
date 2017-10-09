import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';

import { config } from '../../config';

export class Data {

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

// Import RxJs required methods
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
    private apiGet = config.api_url + '/api/get/';
    private apiPost = config.api_url + '/api/post/';

    constructor(private http: Http) { }

    get(action, sid): Observable<Data[]> {
        var token = JSON.parse(localStorage.getItem('id_token')).token
        let headers = new Headers({ 'Content-Type': 'application/json', 'sid': sid, 'Authorization': 'Basic ' + btoa(token + ':') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http
        .get(this.apiGet + action, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    post(action, sid, data): Observable<Data[]> {
        console.log('posting')
        var token = JSON.parse(localStorage.getItem('id_token')).token
        let headers = new Headers({ 'Content-Type': 'application/json', 'sid': sid, 'Authorization': 'Basic ' + btoa(token + ':') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http
        .post(this.apiPost + action, JSON.stringify(data), options)
        .map(this.extractData)
        .catch(this.handleError)
    }

    // localStorage.setItem('id_token', JSON.stringify({ token: body.token }));
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
