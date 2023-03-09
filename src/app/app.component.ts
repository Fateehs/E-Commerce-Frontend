import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETradeApplication';
  constructor(public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    if (this.authService.isAuthenticated == false)
      this.toastrService.message("Logout successful", "Signed out", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
  }
}
