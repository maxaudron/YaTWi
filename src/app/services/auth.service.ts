import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private http: Http) { }
  private authUrl = 'http://localhost:3000/api/auth/';
  data: any

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(logindata): Observable<boolean> {
    //let bodyString = JSON.stringify(body); // Stringify payload
    console.log(logindata)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.authUrl, "username=" + logindata.username + "&password=" + logindata.password, options) // ...using post request
      .map(this.extractData) // ...and calling .json() on the response to return data
      .catch(this.handleError); //...errors if
  }

  loggedIn() {
    var token = localStorage.getItem('id_token');
    console.log(tokenNotExpired(token))
    return tokenNotExpired(token);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body)
    if (body.success == true) {
      console.log("success")
      localStorage.setItem('id_token', JSON.stringify({ token: body.token }));
      this.isLoggedIn = true
    } else {
      console.log("fail")
      this.isLoggedIn = false
    }
    return this.isLoggedIn || {};
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

  logout(): void {
    this.isLoggedIn = false;
  }
}
