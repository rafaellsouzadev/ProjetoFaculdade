import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  items: CategoriaDTO[] = [];
  isMenuOpen = false;

  constructor(public categoriaService: CategoriaService, public router: Router) { }

  ngOnInit() {
    this.categoriaShow();
  }

  categoriaShow(){
   this.categoriaService.findAll()
   .subscribe(response => {
    this.items = response;
    console.log(this.items);
   },
   error => {});

   
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; 
  }

  showProdutos(categoria_id: string) {
    this.router.navigate(['/produtos'], { queryParams: { categoria_id: categoria_id } });
  }

}
