import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from './basic/basic.component';
import { AdvancedtableComponent } from './advancedtable/advancedtable.component';
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




const routes: Routes = [
    {
        path: 'basic',
        component: BasicComponent
    },
    {
        path: 'advanced',
        component: AdvancedtableComponent
    },
    {
        path: 'itemsgroups',
        component: ItemsgroupsComponent
    },
    {
        path: 'units',
        component: UnitsComponent
    },
    {
        path: 'karats',
        component: KaratsComponent
    },
    {
        path: 'paymentmethod',
        component: PaymentmethodComponent
    },
    {
        path: 'marketcategories',
        component: MarketCategoriesComponent
    },
    {
        path: 'itemcategories',
        component: ItemcategoriesComponent
    },
    {
        path: 'offers',
        component: OffersComponent
    },
    {
        path: 'coupons',
        component: CouponsComponent
    },
    {
        path: 'usergroups',
        component: UsergroupsComponent
    },
    {
        path: 'orderstatus',
        component: OrserstatusComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule { }
