import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './pages/pagina-login/pagina-login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroDocenteComponent } from './pages/cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { CadastroNotaComponent } from './pages/cadastro-nota/cadastro-nota.component';
import { NotasAlunosComponent } from './pages/notas-alunos/notas-alunos.component';
import { ListagemDocentesComponent } from './pages/listagem-docentes/listagem-docentes.component';

export const routes: Routes = [
  {
    path: 'login',
    component: PaginaLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastro-docente',
    component: CadastroDocenteComponent
  },
  {
    path: 'cadastro-docente/:id',
    component: CadastroDocenteComponent
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent
  },
  {
    path: 'cadastro-aluno/:id',
    component: CadastroAlunoComponent
  },
  {
    path: 'cadastro-turma',
    component: CadastroTurmaComponent
  },
  {
    path: 'cadastro-nota',
    component: CadastroNotaComponent
  },
  {
    path: 'listagem-docentes',
    component: ListagemDocentesComponent
  },
  {
    path: 'notas',
    component: NotasAlunosComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
