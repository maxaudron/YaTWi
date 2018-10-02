import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs';

import { AppConfig } from '../app.config';

@Injectable()
export class ServerIdService {
  // Observable string sources
  constructor(private config: AppConfig) {}
  private ServerIdSource = new BehaviorSubject<string>(this.config.getConfig('ts_sid'));

  // Observable string streams
  ServerId$ = this.ServerIdSource.asObservable();

  // Service message commands
  announceSid(mission: string) {
    this.ServerIdSource.next(mission);
  }
}
