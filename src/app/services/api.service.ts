import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';

export class Data {

}

// Import RxJs required methods
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  private getUrl = 'http://localhost:3000/api/get/';

  constructor(private http: Http) { }


  get(what): Observable<Data[]> {
    var token = JSON.parse(localStorage.getItem('id_token'));
    return this.http
      .get(this.getUrl + what + '?token=' + token.token)
      .map(this.extractData)
      .catch(this.handleError);
//response => response.json() as Data[]
  }

  // localStorage.setItem('id_token', JSON.stringify({ token: body.token }));
  private extractData(res: Response) {
    let body = res.json();
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