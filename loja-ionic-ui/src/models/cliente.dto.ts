import { EnderecoDTO } from "./endereco.dto";

export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    tipo: string;
    cpfOuCnpj: string;
    rg: string;
    dataNascimento: Date;    
    telefones: string;
    enderecos: EnderecoDTO[];   
    perfil: string[];
    imageUrl? : string;
}


