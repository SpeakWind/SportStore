import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from '../../../rest.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      this.categories = data.map(item => item.category).filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getProducts(category: string = null) {
    return this.products.filter(product => category === null || product.category === category);
  }

  getProduct(id: number) {
    return this.products.find(product => +product.id === +id);
  }

  getCategories() {
    return this.categories;
  }

  saveProduct(product: Product) {
    if (!product.id) {
      this.dataSource.saveProduct(product).subscribe(p => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product).subscribe(() => this.products.splice(
        this.products.findIndex(p => p.id === product.id),
        1,
        product,
      ));
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => this.products.splice(
      this.products.findIndex(p => p.id === id),
      1,
    ));
  }
}
