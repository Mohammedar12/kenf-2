import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingService } from '../../../core/services/marketing.service';
import { Coupon } from '../../../core/models/coupon.models';
import { SharedDataCouponService } from './data';

import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})


export class CouponsComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Coupon[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Coupon[]>;
  total$: Observable<number>;
  newForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  submittedEdit = false;
  error = '';

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;



  constructor(public service: AdvancedService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private setserv: MarketingService,
    private sharedDataService: SharedDataCouponService,
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Market Setting' }, { label: 'Coupons', active: true }];
    this.breadCrumbItems = [{ label: 'Market Setting' }, { label: 'Ofers', active: true }];
    this.sharedDataService.currentTable.subscribe(tableData => (this.tableData = tableData));
    this.setserv.getCoupon().subscribe(val => this.sharedDataService.changeTable(val));
    this.newForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      discount: ['', [Validators.required]],
    });
    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, [Validators.required]],
      code: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      discount: ['', [Validators.required]],
    });
    /**
     * fetch data
     */
    // this._fetchData();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }

  get f() { return this.newForm.controls; }
  get fe() { return this.editForm.controls; }

    open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.newForm.reset();
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        this.newForm.reset();
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      });
    }
    openEdit(content, id) {
      let newTable = this.tableData.filter(data => data.id == id);
      this.editForm.controls['id'].setValue(newTable[0].id);
      this.editForm.controls['code'].setValue(newTable[0].code);
      this.editForm.controls['start_date'].setValue(newTable[0].start_date);
      this.editForm.controls['end_date'].setValue(newTable[0].end_date);
      this.editForm.controls['discount'].setValue(newTable[0].discount);

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.editForm.reset();
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        this.editForm.reset();
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

    /**
     * fetches the table value
     */
    // _fetchData() {
    //   this.tableData = tableData;
    //   for (let i = 0; i <= this.tableData.length; i++) {
    //     this.hideme.push(true);
    //   }
    // }

    /**
     * Sort table data
     * @param param0 sort the column
     *
     */
    onSort({ column, direction }: SortEvent) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }
    onSubmit(modal) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.newForm.invalid) {
        return;
      } else {
        this.setserv.updateCoupon(this.newForm.value).subscribe(data => {
          this.tableData.push({ id: data.id,
                                code: data.code,
                                start_date: data.start_date,
                                end_date: data.end_date,
                                discount: data.discount,
                                status: data.active });
          this.sharedDataService.changeTable(this.tableData);
          this.submitted = false;
          modal.close();
          this.newForm.reset();
        });
      }
    }
    onEdit(modal) {
      this.submittedEdit = true;

      // stop here if form is invalid
      if (this.editForm.invalid) {
        return;
      } else {
        let post_data = this.editForm.getRawValue();
        this.setserv.updateCoupon(post_data).subscribe(data => {
          console.log(post_data);
          let findIndex = this.tableData.findIndex(data => data.id == post_data.id);
          this.tableData[findIndex] = { id: post_data.id,
                                        code: post_data.code,
                                        start_date: post_data.start_date,
                                        end_date: post_data.end_date,
                                        discount: post_data.discount,
                                        status: this.tableData[findIndex].status };
          this.sharedDataService.changeTable(this.tableData);
          this.submittedEdit = false;
          modal.close();
          this.editForm.reset();
        });
      }
    }
    deleteGroupItem(id) {
      this.setserv.delCoupon(id).subscribe(data => {
        let newTable = this.tableData.filter(data => data.id != id);
        console.log(newTable);
        this.sharedDataService.changeTable(newTable);
        // modal.close();
        // this.newForm.reset();
      });
    }

}
