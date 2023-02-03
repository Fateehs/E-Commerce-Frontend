import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyMessageType, AlertifyService, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: List_Product[] = await this.productService.read(() => this.hideSpinner(SpinnerType.BallAtom),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts);
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    await this.getProducts();
  }
}
