import { ProdutoService } from 'src/services/domain/produto.service';
import { PaginatedResponse, ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[] = [];
  categoriaId?: string;

  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoriaId = params['categoria_id'];

      if (this.categoriaId) {
        this.produtoService.findByCategoria(this.categoriaId).subscribe((response: PaginatedResponse) => {
          this.items = response.content;          
        },
      error => {});
      }

    })
  }

  showDetalhes(produto_id: string) {
    this.router.navigate(['/detalhesproduto'], { queryParams: { produto_id: produto_id } });
  }


}
