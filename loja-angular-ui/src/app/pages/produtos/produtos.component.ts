import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse, ProdutoDTO } from './../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  produtos?: ProdutoDTO[];
  categoriaId?: string;
  selectedProducts: ProdutoDTO[] = [];


  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoriaId = params['categoria_id'];

      if (this.categoriaId) {
        this.produtoService.findByCategoria(this.categoriaId).subscribe(
          (response: PaginatedResponse) => {
            this.produtos = response.content;
            console.log(this.produtos);
          },
      error => {});
      }

    })
  }

  onSelectProduct(produto: ProdutoDTO): void {
    const isSelected = this.checkIsSelected(produto);
    if (isSelected) {
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== produto.id);
    } else {
      this.selectedProducts.push(produto);
    }
  }

  checkIsSelected(produto: ProdutoDTO): boolean {
    return this.selectedProducts.some(p => p.id === produto.id);
  }

  formatPrice(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }
  

}
