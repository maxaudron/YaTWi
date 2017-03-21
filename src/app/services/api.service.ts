import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class apiService {
  private getUrl = 'http://localhost:3000/api/get/';


  constructor(private http: Http, private authHttp: AuthHttp) { }

  get(what) {
    return this.authHttp
      .get(this.getUrl + what)
      .toPromise()
      //.then(response => response.json() as Info[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
