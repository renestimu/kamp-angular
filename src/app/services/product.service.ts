import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:1979/api/';
  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath= this.apiUrl+"products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsByCategory(categoryId:Number): Observable<ListResponseModel<Product>> {
    let newPath= this.apiUrl+"products/getbycategory?categoryid="+categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
