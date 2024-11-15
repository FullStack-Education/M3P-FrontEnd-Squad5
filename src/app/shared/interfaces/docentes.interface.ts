import { Profile } from "../enums/profile.enum";

export interface DocenteInterface {
    id: string;
    nome: string;
    email: string;
    senha: string;
    perfil: Profile;
    idade: number;
    genero?: string;
    dataNascimento?: string;
    cpf?: string;
    rg?: string;
    estadoCivil?: string;
    telefone: string;
    naturalidade?: string;
      cep?: string;
      cidade?: string;
      estado?: string;
      logradouro?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      pontoReferencia?: string;
    materias?: string[];
    usuario?: string;
  }