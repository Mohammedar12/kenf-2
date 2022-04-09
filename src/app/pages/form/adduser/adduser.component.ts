import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  
  constructor() { }
 
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'System Users' }, { label: 'Add User', active: true }];
  }
 
 }