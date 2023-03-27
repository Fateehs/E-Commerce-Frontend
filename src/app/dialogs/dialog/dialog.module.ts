import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from '../select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from '../basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CompleteShoppingDialogComponent } from '../complete-shopping-dialog/complete-shopping-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    CompleteShoppingDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, MatCardModule, MatDialogModule,
    FileUploadModule,
    FormsModule
  ]
})
export class DialogModule { }
