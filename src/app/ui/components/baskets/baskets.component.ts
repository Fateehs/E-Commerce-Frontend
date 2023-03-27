import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { DialogService } from '../../../services/common/dialog.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { CompleteShoppingDialogComponent, CompleteShoppingState } from 'src/app/dialogs/complete-shopping-dialog/complete-shopping-dialog.component';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom);

    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;

    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
  }

  removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        await this.basketService.remove(basketItemId);

        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallAtom));
        $("#basketModal").modal("show");

        this.toastrService.message(`The ${basketItemId} has been successfully removed from the cart`, "Product removed", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      }
    });
  }

  async completeShopping() {
    $("#basketModal").modal("hide");
    
    this.dialogService.openDialog({
      componentType: CompleteShoppingDialogComponent,
      data: CompleteShoppingState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);

        const order: Create_Order = new Create_Order();
        order.address = "DenemeMahalle";
        order.description = "Deneme Deneme";

        await this.orderService.create(order);

        this.hideSpinner(SpinnerType.BallAtom);
        this.toastrService.message("Order successfully created", "Order has received", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    })

  }
}
