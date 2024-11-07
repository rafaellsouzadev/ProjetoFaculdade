import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from './services/categoria.service';
import { ProdutoService } from './services/produto.service';
import { NovaCategoriaComponent } from './pages/nova-categoria/nova-categoria.component';
import { NovoProdutoComponent } from './pages/novo-produto/novo-produto.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [ 
  { path: '', component: HomeComponent},
  { path: 'produtos', component: ProdutosComponent},
  { path: 'categorias', component: CategoriaComponent},
  { path: 'categorias-novo', component: NovaCategoriaComponent},
  { path: 'produtos-novo', component: NovoProdutoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    CategoriaComponent,
    HomeComponent,
    NovaCategoriaComponent,
    NovoProdutoComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    MessagesModule,
    InputTextareaModule,
    FileUploadModule,
    TooltipModule,
    InputNumberModule,
    TableModule,
    DropdownModule
    
  ],
  providers: [
    CategoriaService,
    ProdutoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
