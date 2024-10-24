import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolhaEnderecoPageRoutingModule } from './escolha-endereco-routing.module';

import { EscolhaEnderecoPage } from './escolha-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolhaEnderecoPageRoutingModule
  ],
  declarations: [EscolhaEnderecoPage]
})
export class EscolhaEnderecoPageModule {}
