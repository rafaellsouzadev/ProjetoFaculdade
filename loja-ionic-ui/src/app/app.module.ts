import { CategoriaService } from './../services/domain/categoria.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { CidadeService } from 'src/services/cidade.service';
import { EstadoService } from 'src/services/estado.service';
import { ClienteService } from 'src/services/cliente.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartService } from 'src/services/domain/cart.service';
import { PedidoService } from 'src/services/domain/pedido.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     ReactiveFormsModule,
     IonicModule
    ],
  providers: [
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy   
    },
    CategoriaService,
    ProdutoService,
    AuthInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AuthService,
    StorageService,
    CidadeService,
    EstadoService,
    ClienteService,
    CartService,
    PedidoService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
