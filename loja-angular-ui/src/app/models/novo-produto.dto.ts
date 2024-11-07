import { CategoriaDTO } from "./categoria.dto";

export class ProdutoNovo {
    nome!: string;
    descricao!: string;
    preco!: number;
    idCategoria!: CategoriaDTO;
    imagemUri!: string;
}