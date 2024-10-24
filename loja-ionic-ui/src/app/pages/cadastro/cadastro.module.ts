import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { CidadeService } from 'src/services/cidade.service';
import { EstadoService } from 'src/services/estado.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(), 
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CadastroPage],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class CadastroPageModule {}
