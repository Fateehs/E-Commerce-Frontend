import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from 'src/app/admin/components/orders/orders.module';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    RegisterModule
  ]
})
export class ComponentsModule { }
