
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';

export class Error {
	error: string
	message: string
}

export class Token {
	token: string
}



@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    constructor(private http: HttpClient, private config: AppConfig) { }
    private authUrl = this.config.getConfig('api_url') + '/api/auth';
    data: any

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    loginBool(logindata): Observable<boolean> { 
		this.login(logindata).subscribe(
			(data: string) => { 
				let res = data
				if (res) {
					console.log("success")
					localStorage.setItem('id_token', JSON.stringify({ token: res }));
					this.isLoggedIn = true
				} else {
					console.log("fail")
					this.isLoggedIn = false
				}

		})
		return Observable.of(this.isLoggedIn)
	}

    login(logindata) {
		const httpOptions = {
			headers: new HttpHeaders({
				responseType: 'text',
				'Authorization': 'Basic ' + btoa(logindata.username + ':' + logindata.password),
				'ip': this.config.getConfig('ts_ip') 
			}) // ... Set content type to JSON
		};

        return this.http
        .get(this.authUrl, httpOptions) // ...using post request
		.catch(this.handleError); //...errors if
    }

    loggedIn() {
        var token = localStorage.getItem('id_token');

        if (token) {
            // Checks if token isn't expired ... well ...
            if (token) {
                return true
            }
        } else {
            this.logout
            return false
        }
    }

    private handleError(error: Error) {
        // In a real world app, you might use a remote logging infrastructure 
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return observableThrowError(errMsg);
    }

    logout(): void {
        localStorage.removeItem('id_token');
        this.isLoggedIn = false;
    }
}
