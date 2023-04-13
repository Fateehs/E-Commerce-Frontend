import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from 'src/app/admin/components/orders/orders.module';
import { RegisterModule } from './register/register.module';
import { BasketsModule } from './baskets/baskets.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    RegisterModule,
    // LoginModule,
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
