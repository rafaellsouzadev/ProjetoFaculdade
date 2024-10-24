import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-detalhesproduto',
  templateUrl: './detalhesproduto.page.html',
  styleUrls: ['./detalhesproduto.page.scss'],
})
export class DetalhesprodutoPage implements OnInit {

  item!: ProdutoDTO;
  produtoId?: string;

  constructor(public produtoService: ProdutoService,
     private route: ActivatedRoute,
     public cartService: CartService,
     public router: Router  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produtoId = params['produto_id'];

      if (this.produtoId) {
        this.produtoService.findById(this.produtoId).subscribe(response => {
          this.item = response;         
        },
      error => {});
      }

    })
  }


  addTocart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.router.navigate(['/cart'], { queryParams: { produto: produto } })
  }


}
