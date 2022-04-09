import { Component, OnInit } from '@angular/core';

import { Customers } from './customers.model';

import { customersData } from './data';

@Component({
  selector: 'app-shopslist',
  templateUrl: './shopslist.component.html',
  styleUrls: ['./shopslist.component.scss']
})
export class ShopslistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  customersData: Customers[];

  term: any;

  // page
  currentpage: number;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Shops' }, { label: 'Shops', active: true }];

    this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Customers data fetches
   */
  private _fetchData() {
    this.customersData = customersData;
  }
}
