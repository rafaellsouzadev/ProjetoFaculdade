import { NavController, NavParams } from '@ionic/angular';
import { LocalUser } from './../../../models/local_use';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { AuthInterceptor } from 'src/interceptors/auth-interceptor';
import { DomSanitizer } from '@angular/platform-browser';
import { ClienteService } from 'src/services/cliente.service';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente!: ClienteDTO;
  picture!: string;
  profileImage: any;
  auth!: AuthInterceptor;
  email!: string;
  endereco!: string;

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService,
    public sanitizer: DomSanitizer
  ) {
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();    
    if (localUser && localUser.email && localUser.token) {       
      this.clienteService.findByEmail(localUser.email)      
        .subscribe(response => {                   
          this.cliente = response as ClienteDTO;    

          console.log(this.cliente.perfil);
          
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot('/login');
          }
        });
    }
    else {
      this.navCtrl.navigateRoot('/login');
    }    
  }

}
