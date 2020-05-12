import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { StoreComponent } from './store/store.component';

@Injectable()
export class StoreFirstGuard {
  private firstNavigation = true;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              /*Закомментировал чтоб избавится от предупреждений о неиспользуемом параметре*/
              /*state: RouterStateSnapshot*/): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (route.component !== StoreComponent) {
        this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}
