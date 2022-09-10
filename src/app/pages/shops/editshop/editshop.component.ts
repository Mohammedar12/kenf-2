import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Shop } from '../../../core/models/shop.models';
import { ApiFile } from '../../../core/models/api_file.models';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { MarketingService } from '../../../core/services/marketing.service';
import { UserProfileService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editshop',
  templateUrl: './editshop.component.html',
  styleUrls: ['./editshop.component.scss']
})
export class EditShopComponent implements OnInit, OnDestroy {
  productForm: FormGroup;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  selectedOwner: number;
  imageToShow: ApiFile[] = [];
  backend = environment.backend;

  config: DropzoneConfigInterface;
  image = '';
  file = '';
  submit: boolean = false;
  submitted: boolean = false;
  files: number[] = [];
  owners: any[] = [];
  customersData: Shop;
  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private http: HttpClient, private setserv: MarketingService, private userService: UserProfileService) {
    this.config = setserv.getUploadConfig();
    this.files = this.customersData.images;
    // let owners = this.route.snapshot.data.owners;
    // owners.forEach(element => this.owners.push({ id: element.id, email: element.email }));
  }



  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Shops' }, { label: 'Edit Shop', active: true }];
    // this.files.forEach(element => {
    //   let file = new ApiFile();
    //   file.id = element;
    //   this.userService.getFile(element).subscribe(data => {
    //     file.isImageLoading = false;
    //     file.blob = this.createImageFromBlob(data);
    //     this.imageToShow.push(file);
    //   }, error => {
    //     file.isImageLoading = false;
    //     this.imageToShow.push(file);
    //
    //     console.log(error);
    //   });
    // });

    this.userService.getAll().subscribe( val =>   {
      // let owners = this.route.snapshot.data.owners;
      let owners = [];
      val.forEach(element => owners.push({id: element.id, email: element.email}));
      this.owners = owners;
      // this.customersData = val,
      console.log(this.owners);
     });
    this.productForm = this.formBuilder.group({
      id: [this.customersData.id, [Validators.required]],
      seller_id: [this.customersData.seller_id, [Validators.required]],
      app_name_ar: [this.customersData.app_name_ar, [Validators.required]],
      app_name_en: [this.customersData.app_name_en, [Validators.required]],
      phone: [this.customersData.phone, [Validators.required]],
      mobile: [this.customersData.mobile, [Validators.required]],
      email: [this.customersData.email, [Validators.required, Validators.email]],
      address_en: [this.customersData.address_en, [Validators.required]],
      address_ar: [this.customersData.address_ar, [Validators.required]],
      description_ar: [this.customersData.description_ar, [Validators.required]],
      description_en: [this.customersData.description_en, [Validators.required]],
      city: [this.customersData.city, [Validators.required]],
      region: [this.customersData.region, [Validators.required]],
      zip: [this.customersData.zip, [Validators.required]],
      commission: [this.customersData.commission, [Validators.required]],
      images: [this.customersData.images, [Validators.required]],
    });
    this.submit = false;


  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    let imageToShow: any;
    reader.addEventListener("load", () => {
      imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
    return imageToShow;
  }
  ngOnDestroy() {
  }
  /**
   * Returns form
   */
  get f() {
    return this.productForm.controls;
  }
  onUploadSuccess(event) {
    // event[2].srcElement.then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
    console.log(event);
    event[0].previewElement.parentNode.removeChild(event[0].previewElement);
    let response = JSON.parse(event[2].srcElement.response);
    this.files.push(response.id);
    console.log(this.productForm.controls);

    this.productForm.controls.images.setValue(this.files);
    this.submit = false;

  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
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
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    } else {
      console.log(this.productForm);
      this.setserv.addShop(this.productForm.value).subscribe(data => this.router.navigate(['/shops/list']));


    }
  }
}
