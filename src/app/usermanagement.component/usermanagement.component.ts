import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription ,  Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ApiService, ServerData } from '../services/api.service';
import { VirtualServerProperties } from '../services/types'
import { ServerIdService } from '../services/sid.service';
import { FilterNamePipe } from '../pipes/filterName.pipe';
import { FilterUidPipe } from '../pipes/filterUid.pipe'
import { FilterIdPipe } from '../pipes/filterId.pipe'

export class RegEx {}

@Component({
    selector: 'usermanagement',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.scss'],
})

export class UserManagementComponent {
  sid: string;
  subscription: Subscription;
  // ServerData: any;
  closeResult: string;
  runOnce = 0
  clients: any = [];
  modalc: any = []
  sorted: any = [];
  clientsonline: any = [];
  filteredItems: any = [];
  lastEvent: any = {sortColumn: 'online', sortDirection: 'desc'};
  searchName: any
  searchId: any
  searchUid: any

  banModel = new banUserData;
  kickModel = new kickUserData;

  private _alert = new Subject<string>();
  alertMessage: string;

    constructor(public apiService: ApiService, private serverIdService: ServerIdService, private modalService: NgbModal) {}



  ngOnInit() {
    this.subscription = this.serverIdService.ServerId$
      .subscribe(sid => { this.getData(sid); this.sid = sid })

    this.kickModel.kickId = 4

    // this._alert.subscribe((message) => this.alertMessage = message);
    // debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  getData(sid) {
    this.runOnce = 0
    this.apiService.post('clientdblist', sid, {'duration': '999'}).subscribe( (response) => {
      response = response.map(function(o) {
        o['online'] = 'false'
        return o
      })
      this.clients = response; this.assignCopy();
      this.sortData({sortColumn: 'online', sortDirection: 'desc'})
    })
    this.apiService.get('clientlist', sid).subscribe( response => {
      this.clientsonline = response
    })
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

  assignCopy() {
    this.filteredItems = Object.assign([], this.clients);
    this.checkOnline()
  }

  checkOnline() {
    if (this.runOnce === 0) {
      console.log('starting')
      this.clientsonline.forEach(client => {
        const obj = this.clients.findIndex(function (obj) {
          return obj.cldbid === client.client_database_id
        })
        if (obj > -1) {
          this.clients[obj].online = 'true'
          this.clients[obj].clid = client.clid
        }
      })
      this.runOnce = 1
    }
  }

  btnMenu(clientInfo, client) {
    this.modalc = client
    this.modalService.open(clientInfo, { centered: true, size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 'dismissed ${this.getDismissReason(reason)}'
    })
  }

  banUser(client) {
    this.apiService.post(
      'banclient',
      this.sid,
      {'clid': client.clid,
        'time': this.banModel.banTime,
        'banreason': this.banModel.banReason}
    ).subscribe( (response) => {
      this._alert.next(client.client_nickname + ' has been banned for ' + this.banModel.banTime + ' Seconds');
    })
  }

  kickUser(client) {
    this.apiService.post('clientkick',
      this.sid,
      {'clid': client.clid,
        'reasonid': this.kickModel.kickId,
        'reasonmsg': this.kickModel.kickReason}
    ).subscribe( (response) => {
      this._alert.next(client.client_nickname + ' has been kicked');
    })
  }

  deleteUser(client) {
    if (confirm('Really delete User ' + client.client_nickname)) {
      this.apiService.post('clientdbdelete', this.sid, {'cldbid': client.cldbid}).subscribe( (response) => {
        this.getData(this.sid);
        this._alert.next(client.client_nickname + ' has been deleted');
      })
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

export class Client {
  cldbid: number;
  client_created: number;
  client_description: string;
  client_lastconnected: number;
  client_lastip: string;
  client_nickname: string;
  client_totalconnections: string;
  client_unique_identifier: string;
  online: string;
}

export class ClientCriteria {
  sortColumn: string;
  sortDirection: string;
}

export class banUserData {
  banTime: string;
  banReason: string;
}

export class kickUserData {
  kickId: number;
  kickReason: string;
}
