import { Profile } from '../enums/profile.enum';

export interface UsuarioInterface {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfil: Profile;
}
