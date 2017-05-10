import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { ApiService, Data } from '../services/api.service';
import { ServerIdService } from '../services/sid.service';

@Component({
  selector: 'serverswitcher',
  templateUrl: './server_switcher.component.html',
  styleUrls: ['./server_switcher.component.scss']
})
export class ServerSwitcherComponent {
  sid = '2';

  constructor(public apiService: ApiService, private serverIdService: ServerIdService) {}

  servers: Data[] = [];

  ngOnInit() { this.getData() }
  selectServer(item: string) {
    console.log('selected nav item ' + item);
    this.serverIdService.announceSid(item);
  }
  getData() {
    this.apiService.get('serverlist', this.sid)
    .subscribe(
     response => this.servers = response
   )
      this.selectServer('2')
  }
}
