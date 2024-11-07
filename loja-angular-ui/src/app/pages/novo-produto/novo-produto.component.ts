import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { ProdutoNovo } from 'src/app/models/novo-produto.dto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit{


  formulario!: FormGroup;
  categorias?: CategoriaDTO[];


  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      preco: ['', [Validators.required]],
      idCategoria: [null, [Validators.required]],
      imagemUri: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  salvar() {
    this.produtoService.insert(this.formulario.value)
    .subscribe(response => {
      console.log(response);
      alert("Produto salvo com sucesso")
    })
  }

  carregarCategorias() {
    this.categoriaService.findAll().subscribe(response => {
      this.categorias = response;
      console.log(this.categorias);
    }, error => {});
  }

 
  novo() {
    this.formulario?.reset(new ProdutoNovo);
    this.router.navigate(['/categorias-novo']);
  }

}
