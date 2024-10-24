import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacaoPedidoPageRoutingModule } from './confirmacao-pedido-routing.module';

import { ConfirmacaoPedidoPage } from './confirmacao-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacaoPedidoPageRoutingModule
  ],
  declarations: [ConfirmacaoPedidoPage]
})
export class ConfirmacaoPedidoPageModule {}
