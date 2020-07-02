import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsGuard } from './guards/products.guard';
import { ProductsPageComponent } from './components/products-page/products-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductsPageComponent ,
    resolve: {
      products: ProductsGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
