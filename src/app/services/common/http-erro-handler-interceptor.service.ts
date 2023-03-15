import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErroHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService,
    private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You are not authorized to do this operation", "Unauthorized Person", {
            position: ToastrPosition.TopRight,
            messageType: ToastrMessageType.Error
          }
          )

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          })
          break;

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("To be fixed as soon as possible", "Try again soon", {
            position: ToastrPosition.TopRight,
            messageType: ToastrMessageType.Warning
          }
          )
          break;

        case HttpStatusCode.BadRequest:
          this.toastrService.message("The request made is invalid", "Invalid request", {
            position: ToastrPosition.TopRight,
            messageType: ToastrMessageType.Info
          }
          )
          break;

        case HttpStatusCode.NotFound:
          this.toastrService.message("The page you were looking for was not found", "Page not found", {
            position: ToastrPosition.TopRight,
            messageType: ToastrMessageType.Info
          }
          )
          break;

        default:
          this.toastrService.message("Please inform the authorities. Your feedback is very important to us.", "An error has occurred", {
            position: ToastrPosition.TopRight,
            messageType: ToastrMessageType.Warning
          }
          )
          break;
      }
      return of(error);
    }));
  }
}
