import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ClienteService } from 'src/services/cliente.service';
import { CartService } from 'src/services/domain/cart.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-escolha-endereco',
  templateUrl: './escolha-endereco.page.html',
  styleUrls: ['./escolha-endereco.page.scss'],
})
export class EscolhaEnderecoPage implements OnInit {

  items?: EnderecoDTO[];

  pedido!: PedidoDTO;

  constructor(public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService,
    public router: Router
  ) { }

  ngOnInit() {
    this.ionViewDidLoad()
  }


  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = (response as any).enderecos;               

          let cart = this.cartService.getCart();
          
          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null as any,
            pagamento: null as any,
            itens: cart.itens.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
                    
        },
          error => {
            if (error.status == 403) {
              this.router.navigate(['/home/Inbox']);
            }
          });
    }
    else {
      this.router.navigate(['/home/Inbox']);
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
  
    const pedidoString = JSON.stringify(this.pedido);
    const encodedPedidoString = encodeURIComponent(pedidoString); 
    this.router.navigate(['/pagamento'], { queryParams: { pedido: encodedPedidoString } });
  }

}
