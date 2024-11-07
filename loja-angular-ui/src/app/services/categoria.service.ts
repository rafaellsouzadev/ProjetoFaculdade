import { CategoriaNovo } from './../models/nova-categoria.dto';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaDTO } from "../models/categoria.dto";
import { API_CONFIG } from "../config/api.config";



@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {

    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

    save(categoria : CategoriaNovo) {
        return this.http.post(`${API_CONFIG.baseUrl}/categorias`,
            categoria,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}