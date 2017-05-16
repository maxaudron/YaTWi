import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';

import { config } from '../../config';

export class Data {

}

export class ServerData {
	constructor(
virtualserver_name: string,
virtualserver_welcomemessage: string,
virtualserver_maxclients: number,
virtualserver_password: string,
virtualserver_hostbanner_url: string,
virtualserver_hostbanner_gfx_url: string,
virtualserver_hostbanner_gfx_interval: number,
virtualserver_hostbutton_url: string,
virtualserver_hostbutton_gfx_url: string,
virtualserver_hostbutton_tooltip: string
	) {}
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
    var token = JSON.parse(localStorage.getItem('id_token'));
    return this.http
      .get(this.apiGet + sid + '/' + action + '?token=' + token.token)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getServerInfo(action, sid): Observable<ServerData[]> {
    var token = JSON.parse(localStorage.getItem('id_token'));
    return this.http
      .get(this.apiGet + sid + '/' + action + '?token=' + token.token)
      .map(this.extractData)
      .catch(this.handleError);
  }

  post(action, data): Observable<Data[]> {
    console.log('posting')
    var token = JSON.parse(localStorage.getItem('id_token'))
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http
      .post(this.apiPost + action + '?token=' + token.token, JSON.stringify(data), options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  // Send the post request to a specific Teamspeak Virtual Server
  postServer(sid, action, data): Observable<Data[]> {
    console.log(JSON.stringify(data))
    var token = JSON.parse(localStorage.getItem('id_token'))
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http
      .post(this.apiPost + sid + '/' + action + '?token=' + token.token, JSON.stringify(data), options)
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
