import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PaginatedResponse, ProdutoDTO } from "../models/produto.dto";
import { API_CONFIG } from "../config/api.config";
import { ProdutoNovo } from "../models/novo-produto.dto";


@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {

    }

    findByCategoria(categoria_id : string) : Observable<PaginatedResponse> {
        return this.http.get<PaginatedResponse>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    findById(produto_id: string): Observable<ProdutoDTO> {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
      }
      

      insert(produto: ProdutoNovo): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/produtos`, produto, {
          observe: 'response',
          responseType: 'text'
        });
      }
      
    
    
}