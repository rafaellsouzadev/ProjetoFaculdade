import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesprodutoPageRoutingModule } from './detalhesproduto-routing.module';

import { DetalhesprodutoPage } from './detalhesproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesprodutoPageRoutingModule
  ],
  declarations: [DetalhesprodutoPage]
})
export class DetalhesprodutoPageModule {}
