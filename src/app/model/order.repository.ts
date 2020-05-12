import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { RestDataSource } from '../../../rest.datasource';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded = false;

  constructor(private dataSource: RestDataSource) { }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrder();
    }
    return this.orders;
  }

  loadOrder() {
    this.loaded = true;
    this.dataSource.getOrders().subscribe(orders => this.orders = orders);
  }

  updateOrder(order: Order) {
    this.loaded = false;
    this.dataSource.updateOrder(order).subscribe(() => this.orders.splice(
      this.orders.findIndex(o => o.id === order.id),
      1,
      order,
    ));
  }

  deleteOrder(id: number) {
    this.loaded = false;
    this.dataSource.deleteOrder(id).subscribe(() => this.orders.splice(
      this.orders.findIndex(o => o.id === id),
      1,
    ));
  }

  saveOrder(order: Order): Observable<Order> {
    this.loaded = false;
    return this.dataSource.saveOrder(order);
  }
}
