import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { PedidoDTO } from 'src/models/pedido.dto';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  pedido!: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ['pagamentoComCartao', Validators.required]
    });
  }
  
  ngOnInit() {
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

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;    

    const pedidoString = JSON.stringify(this.pedido);
    const encodedPedidoString = encodeURIComponent(pedidoString); 
    this.router.navigate(['/confirmacao-pedido'], { queryParams: { pedido: encodedPedidoString } });
    console.log('Pedido com pagamento: ',this.pedido);
  }

}
