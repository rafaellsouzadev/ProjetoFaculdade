import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/cliente.service';
import { StorageService } from 'src/services/storage.service';
import { AuthService } from 'src/services/auth.service';
import { HomePage } from './pages/home/home.page';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Categorias', url: '/categorias', icon: 'bag-check' },
    { title: 'Carrinho', url: '/cart', icon: 'cart'},
    { title: 'Sair',  icon: 'close' }
    
  ];

  cliente: ClienteDTO | undefined;
  
  constructor(
    public clienteService: ClienteService,
    public storage: StorageService,
    public auth: AuthService,
    public router: Router,
   
  ) {
   
  }


  ngOnInit(): void {
   this.end();
  }

 

  end() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
        },
          error => {});
    }    
  }

  openPage(page: { title: string}) {
    if (page.title === 'Sair') {
      this.auth.logaut();
      this.router.navigate(['/home/Inbox']); // Redireciona para a página inicial
      
    } 
  }


}
