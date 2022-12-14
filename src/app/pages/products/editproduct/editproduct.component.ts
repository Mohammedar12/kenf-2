import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MarketingService } from '../../../core/services/marketing.service';
import { Product } from '../../../core/models/product.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})

/**
 * Ecommerce add-product component
 */
export class EditproductComponent implements OnInit {

  productForm: FormGroup;
  backend = environment.backend;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition

  config: DropzoneConfigInterface;
  image = '';
  file = '';
  submit: boolean = false;
  files: number[] = [];
  shops: any[] = [];
  items_group: any[] = [];
  unit: any[] = [];
  unit_init: number[] = [];
  purity: any[] = [];
  purity_init: number[] = [];
  items_category: any[] = [];
  customersData: Product;
  constructor(private route: ActivatedRoute,private router: Router, public formBuilder: FormBuilder, private http: HttpClient, private setserv: MarketingService) {
    this.config = setserv.getUploadConfig();
    console.log(this.config);
    // this.config.accept = (file) => {
    //   this.onAccept(file);
    // };
    this.customersData = this.route.snapshot.data.product;
    let shops = this.route.snapshot.data.shops;
    shops.forEach(element => this.shops.push({id: element.id, name: element.app_name_en}));
    let purity = this.route.snapshot.data.purity;
    purity.forEach(element => this.purity.push({id: element.id, name: element.name_en}));
    let items_group = this.route.snapshot.data.items_group;
    items_group.forEach(element => this.items_group.push({id: element.id, name: element.name_en}));
    let unit = this.route.snapshot.data.unit;
    unit.forEach(element => this.unit.push({id: element.id, name: element.name_en}));
    let items_category = this.route.snapshot.data.items_category;
    items_category.forEach(element => this.items_category.push({id: element.id, name: element.name_en}));
  }
  get form() {
    return this.productForm.controls;
  }


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Products' }, { label: 'Edit Product', active: true }];
    this.customersData.images.forEach(element => {
      console.log(element);

        this.files.push(element.id);
    });;
    this.customersData.purity_id.forEach(element => {
        this.purity_init.push(element.id);
    });;
    this.customersData.unit_id.forEach(element => {
        this.unit_init.push(element.id);
    });;

    this.productForm = this.formBuilder.group({
      id: [this.customersData.id, [Validators.required]],
      name_ar: [this.customersData.name_ar, [Validators.required]],
      name_en: [this.customersData.name_en, [Validators.required]],
      category_id: [this.customersData.category_id.id, [Validators.required]],
      purity_id: [this.purity_init, [Validators.required]],
      shop_id: [this.customersData.shop_id.id, [Validators.required]],
      weight: [this.customersData.weight, [Validators.required]],
      extra_price: [this.customersData.extra_price, [Validators.required]],
      quantity: [this.customersData.quantity, [Validators.required]],
      group_id: [this.customersData.group_id.id, [Validators.required]],
      unit_id: [this.unit_init, [Validators.required]],
      commission: [this.customersData.commission, [Validators.required]],
      description_ar: [this.customersData.description_ar, [Validators.required]],
      description_en: [this.customersData.description_en, [Validators.required]],
      images: [this.customersData.images, [Validators.required]],

    });
  }

  onUploadInit(event) {
    console.log(event);

    this.submit=true;

  }
  onQueueComplete(event){
    this.submit = false;

  }
  onUploadError(event){
    console.log(event);


  }
  onUploadSuccess(event){
    // event[2].srcElement.then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
    event[0].previewElement.parentNode.removeChild(event[0].previewElement);
    let response = JSON.parse(event[2].srcElement.response);
    this.files.push(response.id);
    console.log(this.productForm.controls);

    this.productForm.controls.images.setValue(this.files);
  }
  deleteImage(id) {
    const index = this.files.indexOf(id);
    if (index > -1) {
      this.files.splice(index, 1); // 2nd parameter means remove one item only
      this.productForm.controls.images.setValue(this.files);
    }
  }
  /**
   * Bootsrap validation form submit method
   */
   validSubmit() {
      this.submit = true;
      console.log(this.productForm);

       if (this.productForm.invalid) {
         return;
       } else {
         console.log(this.productForm);
         this.setserv.addProduct(this.productForm.value).subscribe(data => this.router.navigate(['/products/list']));
       }

   }
}
