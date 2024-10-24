import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/cidade.service';
import { ClienteService } from 'src/services/cliente.service';
import { EstadoService } from 'src/services/estado.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formGroup: FormGroup;
  
  estados?: EstadoDTO[];
  cidades?: CidadeDTO[];

  constructor(public formBuilder: FormBuilder,
     public cidadeService: CidadeService,
     public estadoService: EstadoService,
     public clienteService: ClienteService,
     public alertCtrl: AlertController,
     public router: Router) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', []],
      cep: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
   }
  ngOnInit(): void {
   this.ionViewDidLoad();
  }

   
  
  ionViewDidLoad(){
   this.estadoService.findAll()
    .subscribe(response => {      
      this.estados = response;      
      this.formGroup.controls['estadoId'].setValue(this.estados[0].id);
      this.updateCidades();
    })
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls['cidadeId'].setValue(null);
    },
    error => {});
  }

  cadastroUser() {
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
    error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home/Inbox']);
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
