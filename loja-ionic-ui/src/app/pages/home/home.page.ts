import { CredenciaisDTO } from './../../../models/credenciais.dto';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  creds: CredenciaisDTO = {
    email: '',
    senha: '',
  };

  constructor(
    private router: Router,
    public menu: MenuController,
    public auth: AuthService,
    public navCtrl: NavController

  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      (response) => {
        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader != null) {
          this.auth.successfullLogin(authorizationHeader);
          this.router.navigate(['/categorias']);
        } else {         
          console.error('Acesso não autorizado.');
        }
      },
      (error) => {
        // Trate o erro, por exemplo, exibir uma mensagem de erro
        console.error('Falha ao realiza o login', error);
      }
    );
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(
      (response) => {
        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader) {
          this.auth.successfullLogin(authorizationHeader);
          this.router.navigate(['/categorias']); 
        } else {
          // Trate o caso em que o cabeçalho de autorização está ausente
          console.error('Acesso não autorizado.');
        }
      },
      (error) => {
        // Trate o erro, por exemplo, exibir uma mensagem de erro
        console.error('Falha ao realiza o login', error);
      }
    );
  }

  cadastrar() {
    this.navCtrl.navigateRoot('/cadastro')
  }

}
