import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

declare var $: any

@Component({
  selector: 'app-complete-shopping-dialog',
  templateUrl: './complete-shopping-dialog.component.html',
  styleUrls: ['./complete-shopping-dialog.component.scss']
})
export class CompleteShoppingDialogComponent extends BaseDialog<CompleteShoppingDialogComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<CompleteShoppingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteShoppingState) {
    super(dialogRef)
  }

  show: boolean = false;
  complete() {
    this.show = true;
  }

  ngOnDestroy(): void {
    if (!this.show)
      $("#basketModal").modal("show");
  }
}

export enum CompleteShoppingState {
  Yes,
  No
}
