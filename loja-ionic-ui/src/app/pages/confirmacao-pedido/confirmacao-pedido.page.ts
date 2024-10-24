import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CartItem } from 'src/models/cart-item';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ClienteService } from 'src/services/cliente.service';
import { CartService } from 'src/services/domain/cart.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-confirmacao-pedido',
  templateUrl: './confirmacao-pedido.page.html',
  styleUrls: ['./confirmacao-pedido.page.scss'],
})
export class ConfirmacaoPedidoPage implements OnInit {

  pedido! : PedidoDTO;
  cartItems!: CartItem[];
  cliente!: ClienteDTO;
  endereco!: EnderecoDTO;
  codpedido!: string;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public clienteService: ClienteService,    
    public pedidoService: PedidoService,
     public loadingCtrl: LoadingController
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['pedido']) {
        try {
          const pedidoString = decodeURIComponent(params['pedido']); // Decodifica a string JSON
          this.pedido = JSON.parse(pedidoString) as PedidoDTO; // Faz o parsing do JSON para objeto
          console.log('Pedido recebido:', this.pedido);
        } catch (e) {
          console.error('Erro ao analisar o JSON:', e);
          this.pedido = {} as PedidoDTO; // Inicializa como um objeto vazio
        }
      }
    });
   }

  ngOnInit() {
    this.ionViewDidLoad()
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, (response as any).enderecos);
        
      },
        error => {
          this.router.navigate(['/categorias']);
        });
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.router.navigate(['/cart']);
  }

  home() {
    this.router.navigate(['/categorias'])
  }

  checkout() {
    
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.criarOuLimparCarrinho();
        
        this.codpedido = this.extractId(response.headers.get('location') || '');
        this.router.navigate(['/categorias'])
      },
        error => {          
          if (error.status == 403) {
            
            this.router.navigate(['/categorias']);
          }
        });
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  

}
