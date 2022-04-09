import { Component, OnInit } from '@angular/core';
import { productModel, productList } from '../product.model';
import { Options } from 'ng5-slider';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

/**
 * Ecommerce products component
 */

export class ProductsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  pricevalue = 100;
  minVal = 100;
  maxVal = 500;

  priceoption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return 'SAR ' + value;
    },
  };
  log = '';
  discountRates: number[] = [];
  public products: productModel[] = [];
  public productTemp: productModel[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Products' }, { label: 'All Products', active: true }];
    this.products = Object.assign([], productList);

    // this.http.get<any>(`http://localhost:8000/api/products`)
    //   .subscribe((response) => {
    //     this.products = response.data;
    //     console.log('pro', response.data);
    //   });

  }

  searchFilter(e) {
    const searchStr = e.target.value;
    this.products = productList.filter((product) => {
      return product.nameEn.toLowerCase().search(searchStr.toLowerCase()) !== -1;
    });
  }

}
