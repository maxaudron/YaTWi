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

	constructor(private http: HttpClient) {}

	/**
	 *      * Use to get the data found in the second file (config file)
	 *           */
	public getConfig(key: any) {
		return this.config[key];
	}

	/**
	 *      * Use to get the data found in the first file (env file)
	 *           */
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
	 *      * This method:
	 *           *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
	 *                *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
	 *                     */
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
}
