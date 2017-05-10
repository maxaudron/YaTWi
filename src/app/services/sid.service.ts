import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ServerIdService {
  // Observable string sources
  private ServerIdSource = new Subject<string>();

  // Observable string streams
  ServerId$ = this.ServerIdSource.asObservable();

  // Service message commands
  announceSid(mission: string) {
    this.ServerIdSource.next(mission);
  }
}
