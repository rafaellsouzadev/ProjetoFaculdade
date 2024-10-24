import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolhaEnderecoPage } from './escolha-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: EscolhaEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolhaEnderecoPageRoutingModule {}
