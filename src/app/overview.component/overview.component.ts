import { Component, OnInit } from '@angular/core';
import { ApiService, Data } from '../services/api.service'

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  constructor(public apiService: ApiService) { }

  data: Data[] = [];

  ngOnInit() { this.getData() }
  getData() {
    this.apiService.get('serverinfo')
    .subscribe(
     response => this.data = response
   )
   //console.log(this.data.virtualserver_name)
  }
}
