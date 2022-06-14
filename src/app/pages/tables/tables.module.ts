import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbAlertModule, NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesRoutingModule } from './tables-routing.module';
import { AdvancedSortableDirective } from './advancedtable/advanced-sortable.directive';
import { BasicComponent } from './basic/basic.component';
import { AdvancedtableComponent } from './advancedtable/advancedtable.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsgroupsComponent } from './itemsgroups/itemsgroups.component';
import { SharedDataService } from './itemsgroups/data';
import { SharedDataUnitsService } from './units/data';
import { SharedDataItemsCatService } from './itemcategories/data';
import { SharedDataKaratService } from './karats/data';
import { SharedDataPMService } from './paymentmethod/data';
import { SharedDataOrderStatusrvice } from './orderstatus/data';
import { SharedDataMarketCategoryService } from './marketcategories/data';
import { SharedDataOfferService } from './offers/data';
import { SharedDataCouponService } from './coupons/data';
import { SharedDataUserGroupsService } from './usergroups/data';
import { NgSelectModule } from '@ng-select/ng-select';

import { UnitsComponent } from './units/units.component';
import { KaratsComponent } from './karats/karats.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { MarketCategoriesComponent } from './marketcategories/marketcategories.component';
import { ItemcategoriesComponent } from './itemcategories/itemcategories.component';
import { OffersComponent } from './offers/offers.component';
import { CouponsComponent } from './coupons/coupons.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';

@NgModule({
  declarations: [BasicComponent, AdvancedtableComponent, AdvancedSortableDirective, ItemsgroupsComponent, UnitsComponent, KaratsComponent, PaymentmethodComponent, MarketCategoriesComponent, ItemcategoriesComponent, OffersComponent, CouponsComponent, UsergroupsComponent, OrderstatusComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgSelectModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
  ],
  exports: [
  ],
  providers: [
    SharedDataService,
    SharedDataItemsCatService,
    SharedDataUnitsService,
    SharedDataKaratService,
    SharedDataPMService,
    SharedDataOrderStatusrvice,
    SharedDataMarketCategoryService,
    SharedDataOfferService,
    SharedDataCouponService,
    SharedDataUserGroupsService,
  ]
})
export class TablesModule { }
