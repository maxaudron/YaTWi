import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import { config } from '../../config';

@Injectable()
export class ServerIdService {
  // Observable string sources
  private ServerIdSource = new BehaviorSubject<string>(config.ts_sid);

  // Observable string streams
  ServerId$ = this.ServerIdSource.asObservable();

  // Service message commands
  announceSid(mission: string) {
    this.ServerIdSource.next(mission);
  }
}
