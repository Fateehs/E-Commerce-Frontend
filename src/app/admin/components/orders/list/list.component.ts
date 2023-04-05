import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Order } from 'src/app/contracts/order/list_order';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';
import { OrderService } from '../../../../services/common/models/order.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'viewdetail', 'delete'];
  dataSource: MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.BallAtom);

    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: AlertifyMessageType.Error,
      position: AlertifyPosition.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }

  showDetail(id: string) {
    // alert(id)
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options:{
        width: "750px",
      }
    });
  }

}