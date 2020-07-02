import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllProducts } from '../store/shopping.actions';
import { areProductsLoaded } from '../store/shopping.selectors';
import { AppState } from 'src/app/reducers';

@Injectable({
  providedIn: 'root',
})
export class ProductsGuard implements Resolve<any> {
  productsLoading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this.store.pipe(
      select(areProductsLoaded),
      tap((productsLoaded) => {
        if (!this.productsLoading && !productsLoaded) {
          this.productsLoading = true;
          this.store.dispatch(loadAllProducts());
        }
      }),
      filter((productsLoaded) => productsLoaded),
      first(),
      finalize(() => (this.productsLoading = false))
    );
  }
}
