import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientSerivce: HttpClientService) { }

  async generateQRCode(productId: string) {
    const observable: Observable<Blob> = this.httpClientSerivce.get({
      controller: "products",
      action: "qrcode",
      responseType: 'blob'
    }, productId)

    return await firstValueFrom(observable);
  }
}
