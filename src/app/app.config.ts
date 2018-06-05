
import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

export class Env {
	env: string
}

export class Config {
	ts_ip: string
	ts_sid: string
	api_url: string
}

@Injectable()
export class AppConfig {

    private config: Object = null;
    private env:    Object = null;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

	private getEnvFile() {
		return this.http.get<Env>("/assets/env.json")
	}

	private getConfigFile(env) {
		return this.config = this.http.get<Config>( '/assets/config.' + env + '.json' )
	}

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
	public load() {
		return new Promise(
			(resolve, reject) => {
				this.getEnvFile().subscribe(
					(env: Env) => { 
						this.env = env
						this.getConfigFile(env.env).subscribe(
							(config: Config) => {
								this.config = config
								resolve(true)
							}
						)
					}
				)
			}
		)
	}


   // public load() {
   //     return new Promise((resolve, reject) => {
   //         this.http.get('/assets/env.json').pipe(catchError((error: any):any => {
   //             console.log('Configuration file "env.json" could not be read');
   //             resolve(true);
   //             return observableThrowError(error.json().error || 'Server error');
   //         }),).subscribe( (envResponse) => {
   //             this.env = envResponse;
   //             let request:any = null;

   //             switch (envResponse.env) {
   //                 case 'production': {
   //                     request = this.http.get('/assets/config.' + envResponse.env + '.json');
   //                 } break;

   //                 case 'development': {
   //                     request = this.http.get('assets/config.' + envResponse.env + '.json');
   //                 } break;

   //                 case 'default': {
   //                     console.error('Environment file is not set or invalid');
   //                     resolve(true);
   //                 } break;
   //             }

   //             if (request) {
   //                 request
   //                     .map( res => res.json() )
   //                     .catch((error: any) => {
   //                         console.error('Error reading ' + envResponse.env + ' configuration file');
   //                         resolve(error);
   //                         return observableThrowError(error.json().error || 'Server error');
   //                     })
   //                     .subscribe((responseData) => {
   //                         this.config = responseData;
   //                         resolve(true);
   //                     });
   //             } else {
   //                 console.error('Env config file "env.json" is not valid');
   //                 resolve(true);
   //             }
   //         });

   //     });
   // }
}
