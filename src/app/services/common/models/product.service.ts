import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService
      .post(
        {
          fullEndPoint: "https://localhost:7235/api/products"
        },
        product
      )
      .subscribe((result) => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<String> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (erroMessage: string) => void): Promise<List_Product[]> {
    const promiseData: Promise<List_Product[]> = this.httpClientService.get<List_Product[]>({
      fullEndPoint: "https://localhost:7235/api/products"
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
}
