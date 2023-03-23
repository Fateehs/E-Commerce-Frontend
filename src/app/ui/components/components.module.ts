import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from 'src/app/admin/components/orders/orders.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { BasketsModule } from './baskets/baskets.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    RegisterModule,
    // LoginModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
