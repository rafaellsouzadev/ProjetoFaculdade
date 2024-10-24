import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "src/models/cart";
import { ProdutoDTO } from "src/models/produto.dto";

@Injectable()
export class CartService {


    constructor(public storage: StorageService) {

    }

    criarOuLimparCarrinho() : Cart {
        let cart: Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.criarOuLimparCarrinho();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.itens.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.itens.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    incrementarProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.itens[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    removerQuantidade(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.itens[position].quantidade--;
            if (cart.itens[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.itens.length; i++) {
            sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
        }
        return sum;
    }

}