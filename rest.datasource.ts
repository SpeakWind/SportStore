import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './src/app/model/product.model';
import { Order } from './src/app/model/order.model';
import { map } from 'rxjs/operators';

const PROTOCOL = 'http';
const PORT = '3500';

@Injectable()
export class RestDataSource {
  baseurl: string;
  authToken: string;

  constructor(private http: HttpClient) {
    this.baseurl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, password: string): Observable<boolean> {
    return this.http.request<any>(
      'POST',
      `${this.baseurl}login`,
      { body: { name: user, password } },
    ).pipe(map((res) => {
      this.authToken = res.success ? res.token : null;
      return res.success;
    }));
  }

  getProducts(): Observable<Product[]> {
    return this.sendRequest<Product[]>('GET', 'products');
  }

  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>(
      'POST',
      'products',
      product,
      true,
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>(
      'PUT',
      `products/${product.id}`,
      product,
      true,
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest<Product>(
      'DELETE',
      `products/${id}`,
      null,
      true,
    );
  }

  saveOrder(order: Order): Observable<Order> {
    return this.sendRequest<Order>('POST', 'orders', order);
  }

  getOrders(): Observable<Order[]> {
    return this.sendRequest<Order[]>(
      'GET',
      'orders',
      null,
      true,
    );
  }

  deleteOrder(id: number): Observable<Order> {
    return this.sendRequest<Order>(
      'DELETE',
      `orders/${id}`,
      null,
      true,
    );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.sendRequest<Order>(
      'PUT',
      `orders/${order.id}`,
      order,
      true,
    );
  }

  private sendRequest<T>(
    verb: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: Product | Order,
    auth: boolean = false,
  ): Observable<T> {
    let headers = new HttpHeaders();
    if (auth && !!this.authToken) {
      headers = headers.set('authorization', `Bearer<${this.authToken}>`);
    }
    return <Observable<T>> this.http.request<Product | Product[] | Order | Order[]>(
      verb,
      `${this.baseurl}${url}`,
      { body, headers, responseType: 'json' }
    );
  }

}
