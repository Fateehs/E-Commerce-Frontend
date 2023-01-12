import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
    
    get<T>(controller: string, action?: string, id?: string){
      let url : string ="";

      url = `${this.baseUrl}/{controller}/{action}`;
    }

    post(){

    }

    put(){

    }

    delete(){

   }
}
