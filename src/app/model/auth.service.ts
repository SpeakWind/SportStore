import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private dataSource: RestDataSource) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.dataSource.authenticate(username, password);
  }

  get authenticated(): boolean {
    return !!this.dataSource.authToken;
  }

  clear() {
    this.dataSource.authToken = null;
  }
}
