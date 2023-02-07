import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(public spinner: NgxSpinnerService) { }

  showSpinner(spinnerType: SpinnerType) {
    this.spinner.show(spinnerType);
    setTimeout(() => this.hideSpinner(spinnerType), 3000)
  }

  hideSpinner(spinnerType: SpinnerType) {
    this.spinner.hide(spinnerType);
    setTimeout(() => this.hideSpinner(spinnerType), 3000)
  }
}

export enum SpinnerType {
  BallAtom = "s1",
  BallScaleMultiple = "s2",
  BallSpinClokwiseFadeRotating = "s3",
}