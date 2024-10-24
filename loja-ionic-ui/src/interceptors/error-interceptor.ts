import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "src/services/storage.service";
import { AlertController, NavController } from "@ionic/angular";
import { FieldMessage } from "src/models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  

  constructor(public storage: StorageService, public navCtrl: NavController,
      public alertCtrl: AlertController
  ) {

  }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {          
          return next.handle(req)
            .pipe(
              catchError((error, caught) => {                      
               let errorObj = error;

               if (errorObj.error) {
                  errorObj = errorObj.error;
               }

               if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
               }

               console.log("Erro detectado pelo interceptor:");
               console.log(errorObj);

               switch(errorObj.status) {
                case 401:
                  this.handle401();
                  break;
                case 403:
                  this.handle403;
                  break;
                case 422:
                  this.handle422;
                  break;              

                  default:
                    this.handleDefaultError(errorObj);
               }
    
               return throwError(errorObj);
              }) 
            ) as any;        
      }

      handle401(){
        let alert = this.alertCtrl.create({
          header: 'Erro 401: falha de autenticação',
          message: 'Email ou Senha incorretos',
          backdropDismiss: false,
          buttons: [
            {
              text: 'OK'
            }
          ]
        }).then(alert => alert.present());
        
      }

      handle422(errorObj: { error: any; }) {
        let alert = this.alertCtrl.create({
          header: 'Erro 422: Validação',
          message: this.listErros(errorObj.error),
          backdropDismiss: false,
          buttons: [
            {
              text: 'OK'
            }
          ]
        }).then(alert => alert.present());
      }

      handle403() {
        this.storage.setLocalUser(null as any);
      }        

      handleDefaultError(errorObj: any){
      let alert = this.alertCtrl.create({
        header: 'Erro' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message + '\n' + errorObj.path,        
        backdropDismiss: false,
        buttons: [
          {
            text: 'OK'
          }
        ],
        cssClass: 'custom-error-alert',
      }).then(alert => alert.present());
    }
  

    private listErros(messages : FieldMessage[]) : string {
      let s : string = '';
      for (var i=0; i<messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>'
      }
      return s;
    }

}
