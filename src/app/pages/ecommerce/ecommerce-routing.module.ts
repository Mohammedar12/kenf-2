import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ShopsComponent } from './shops/shops.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { AddshopComponent } from './addshop/addshop.component';
import { ShopslistComponent } from './shopslist/shopslist.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsComponent } from './terms/terms.component';
import { AddsellerComponent } from './addseller/addseller.component';
import { SellerslistComponent } from './sellerslist/sellerslist.component';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product-detail/:id',
        component: ProductdetailComponent
    },
    {
        path: 'shops',
        component: ShopsComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'add-product',
        component: AddproductComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'addshop',
        component: AddshopComponent
    },
    {
        path: 'shopslist',
        component: ShopslistComponent
    },
    {
        path: 'privacypolicy',
        component: PrivacypolicyComponent
    },
    {
        path: 'terms',
        component: TermsComponent
    },
    {
        path: 'addseller',
        component: AddsellerComponent
    },
    {
        path: 'sellerslist',
        component: SellerslistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
