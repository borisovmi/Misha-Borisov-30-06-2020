import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Product, Shop } from '../../models/product';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllShops } from '../../store/shopping.selectors';
import { productAdded, shopUpdated } from '../../store/shopping.actions';
import { AppState } from 'src/app/reducers';
import { ShoppingService } from '../../shopping.service';
import { findShop } from '../../utilities/findShop';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  allShops$: Subscription;
  allShops: Shop[];

  addProductForm = new FormGroup({
    name: new FormControl('asd', [
      Validators.required,
      Validators.minLength(1),
    ]),
    shopId: new FormControl('s2', [Validators.pattern('s[0-9]+')]),
    priceUSD: new FormControl(9.99, [
      Validators.required,
      Validators.min(0.01),
    ]),
    deliveryEstDate: new FormControl('', [Validators.required]),
  });

  submitted = false;

  @ViewChild('autoFocusedInput') autoFocusedInput: ElementRef;

  constructor(
    private store: Store<AppState>,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.allShops$ = this.store
      .pipe(select(selectAllShops))
      .subscribe((allShops) => (this.allShops = allShops));
  }

  onSubmit() {
    const shop = findShop(this.allShops, this.addProductForm.value.shopId);

    const newProduct = this.shoppingService.createNewProduct(
      this.addProductForm.value.name,
      this.addProductForm.value.priceUSD,
      this.addProductForm.value.deliveryEstDate,
      shop
    );

    const updatedShop = {
      ...newProduct.shop,
      ...this.shoppingService.recalculateShopTotals({product: newProduct, calculationType: 'add'}),
    };

    this.store.dispatch(productAdded({ product: { ...newProduct } }));
    this.store.dispatch(
      shopUpdated({
        update: { id: updatedShop.id, changes: { ...updatedShop } },
      })
    );

    this.submitted = true;
    this.addProductForm.disable();
  }

  onResetForm(formGroupDirective: FormGroupDirective) {
    this.addProductForm.enable();
    this.submitted = false;
    this.addProductForm.reset();
    formGroupDirective.resetForm();
    this.autoFocusedInput.nativeElement.focus();
  }

  ngOnDestroy() {
    this.allShops$.unsubscribe();
  }
}
