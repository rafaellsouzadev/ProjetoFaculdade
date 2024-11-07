
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaNovo } from 'src/app/models/nova-categoria.dto';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent {

  formulario!: FormGroup;

  constructor(private router: Router,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder){

      this.formulario = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      });
  }


  salvar() {
    this.categoriaService.save(this.formulario.value)
    .subscribe(response => {
      console.log(response);
      alert("Categoria salva com sucesso")
    })
  } 

  novo() {
    this.formulario?.reset(new CategoriaNovo);

    this.router.navigate(['/categorias-novo'])
  }

}
