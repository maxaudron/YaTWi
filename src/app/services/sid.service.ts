import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class ServerIdService {
  // Observable string sources
  private ServerIdSource = new BehaviorSubject<string>('2');

  // Observable string streams
  ServerId$ = this.ServerIdSource.asObservable();

  // Service message commands
  announceSid(mission: string) {
    this.ServerIdSource.next(mission);
  }
}
