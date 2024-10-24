import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesprodutoPage } from './detalhesproduto.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesprodutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesprodutoPageRoutingModule {}
