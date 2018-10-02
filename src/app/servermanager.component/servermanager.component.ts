import { Component } from '@angular/core';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { ApiService, Data } from '../services/api.service';
import { SortService } from '../sortable.component/sort.service'
import { ServerIdService } from '../services/sid.service';
import { FilterNamePipe } from '../pipes/filterName.pipe';
import { FilterUidPipe } from '../pipes/filterUid.pipe'
import { FilterIdPipe } from '../pipes/filterId.pipe'

export class createServerProps {
  virtualserver_name: string
  virtualserver_port: string
  virtualserver_autostart = '1'
  virtualserver_maxclients = '25'
}

@Component({
    selector: 'servermanager',
    templateUrl: './servermanager.component.html',
    styleUrls: ['./servermanager.component.scss']
})
export class ServerManagerComponent {
  subscription: Subscription
  servers: any
  cserver = new createServerProps
  sid: string
  closeResult: string
  clients: any = [];
  filteredItems: any = [];
  lastEvent: any = {sortColumn: 'online', sortDirection: 'desc'};

  constructor(public apiService: ApiService, private serverIdService: ServerIdService, private modalService: NgbModal) {}

  ngOnInit() {
      this.subscription = this.serverIdService.ServerId$
          .subscribe(sid => { this.getData(sid); this.sid = sid })
  }

  btnModal(modal) {
    this.modalService.open(modal, { centered: true, size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 'dismissed ${this.getDismissReason(reason)}'
    })
  }

  selectServer(item: string) {
      console.log('selected nav item ' + item);
      this.serverIdService.announceSid(item);
  }

  startServer(sid: string) {
      this.apiService.post('serverstart', this.sid, {sid: sid})
          .subscribe(
              response => {this.getData(this.sid)}
          )
  }

  stopServer(sid: string) {
      this.apiService.post('serverstop', this.sid, {sid: sid})
          .subscribe(
              response => {this.getData(this.sid)}
          )
  }

    deleteServer(data) {
  if (confirm('Really delete server: ' + name)) {
      if (data.virtualserver_status === 'online') {
        this.apiService.post('serverstop', this.sid, {sid: data.virtualserver_id})
          .subscribe(
            res => { this.apiService.post('serverdelete', this.sid, {sid: data.virtualserver_id})
                    .subscribe(
                      response => {this.getData(this.sid)}
                    )
                  }
          )
      } else {
        this.apiService.post('serverdelete', this.sid, {sid: data.virtualserver_id})
          .subscribe(
            response => {this.getData(this.sid)}
          )
      }
    }
  }


  createServer(data: createServerProps) {
      this.apiService.post('servercreate', this.sid, data)
          .subscribe(
              response => {this.getData(this.sid)}
          )
  }

  getData(sid) {
      this.apiService.get('serverlist', sid)
          .subscribe(
              response => this.servers = response
          )
  }

  sortData(criteria: ClientCriteria) {
    this.filteredItems = this.clients.sort((a, b) => {
    if (criteria.sortDirection === 'desc') {
        return a[criteria.sortColumn] < b[criteria.sortColumn];
    } else {
        return a[criteria.sortColumn] > b[criteria.sortColumn];
      }
    });
  }

  onSorted($event) {
    this.lastEvent = $event
    this.sortData($event)
  }
}

export class ClientCriteria {
  sortColumn: string;
  sortDirection: string;
}
