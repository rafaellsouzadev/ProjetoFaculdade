import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { CategoriasPage } from '../categorias/categorias.page';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items!: CartItem[];

  constructor(public cartService: CartService, private router: Router) { }
  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    this.loadCartItems();
  }

  loadCartItems() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).itens;   
  }

  incrementaQuantidade(produto: ProdutoDTO) {
    this.items = this.cartService.incrementarProduto(produto).itens;    
  }

  removerQuantidade(produto: ProdutoDTO) {
    this.items = this.cartService.removerQuantidade(produto).itens;
  }

  total() : number {
    return this.cartService.total();
  }


  returnCategoria() {
    this.router.navigate(['/categorias']);
  }

  escolhaEndereco() {
    this.router.navigate(['/escolha-endereco'])
   
  }

}
