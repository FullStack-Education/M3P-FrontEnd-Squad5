export interface UsuarioInterface {
    id: string;
    nome: string;
    email: string;
    senha: string;
    perfil: string;
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
    turmas?: string[];
  }
  