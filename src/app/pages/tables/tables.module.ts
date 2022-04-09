import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from './tables-routing.module';
import { AdvancedSortableDirective } from './advancedtable/advanced-sortable.directive';
import { BasicComponent } from './basic/basic.component';
import { AdvancedtableComponent } from './advancedtable/advancedtable.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsgroupsComponent } from './itemsgroups/itemsgroups.component';
import { UnitsComponent } from './units/units.component';
import { KaratsComponent } from './karats/karats.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { MarketCategoriesComponent } from './marketcategories/marketcategories.component';
import { ItemcategoriesComponent } from './itemcategories/itemcategories.component';
import { OffersComponent } from './offers/offers.component';
import { CouponsComponent } from './coupons/coupons.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { OrserstatusComponent } from './orserstatus/orserstatus.component';

@NgModule({
  declarations: [BasicComponent, AdvancedtableComponent, AdvancedSortableDirective, ItemsgroupsComponent, UnitsComponent, KaratsComponent, PaymentmethodComponent, MarketCategoriesComponent, ItemcategoriesComponent, OffersComponent, CouponsComponent, UsergroupsComponent, OrserstatusComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule
  ]
})
export class TablesModule { }
