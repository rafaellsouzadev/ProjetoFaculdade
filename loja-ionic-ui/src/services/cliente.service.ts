import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { AuthService } from "./auth.service";
import { API_CONFIG } from "src/config/api.config";
import { Observable } from "rxjs";
import { ClienteDTO } from "src/models/cliente.dto";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService, public auth: AuthService) {
    }


    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }



    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


}