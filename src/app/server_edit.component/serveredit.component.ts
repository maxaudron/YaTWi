import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { ApiService, Data } from '../services/api.service';

export class RegEx {}

@Component({
  selector: 'serveredit',
  templateUrl: './serveredit.component.html',
  styleUrls: ['./serveredit.component.scss']
})

export class ServerEditComponent {
    constructor(public apiService: ApiService) {}
    data: Data[] = [];

    ngOnInit() { this.getData() }
    getData() {
        this.apiService.get('serverinfo').subscribe( response => this.data = response )
    }
}
