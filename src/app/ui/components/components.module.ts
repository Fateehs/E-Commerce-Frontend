import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from 'src/app/admin/components/orders/orders.module';
import { CustomersComponent } from 'src/app/admin/components/customers/customers.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CustomersComponent
  ]
})
export class ComponentsModule { }
