export interface ProdutoDTO {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imageUri: string;
}

export interface PaginatedResponse {
    content: ProdutoDTO[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }