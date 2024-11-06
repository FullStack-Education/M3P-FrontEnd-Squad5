# M3P-FrontEnd-Squad5

## Alunos
Ana Helena Fernandes Peres

Cheryl Henkels de Souza

Heverton Luan Roieski

Leonardo Madeira Barbosa da Silva

Suzi Fortunata Harima

Vitor Schultz Sertã Machado



## Descrição
Sistema de controle de uma instituição de ensino que permite a gestão de cursos, turmas, matérias, notas, alunos e docentes. Ela pode ser implementada em creches, escolas, universidades, ou qualquer entidade de ensino para gerir seu sistema organizacional.
O repositório atual constitui a parte Front-End do software, o qual é feito com o framework Angular.
A aplicação foi feita em html, scss e javascript.



## Execução 

O sistema baseia-se na utilização de diferentes papéis de usuário para restringir o acesso às diferentes páginas do sistema. Assim, no momento do login é necessário fornecer email e senha.

Para testar as funcionalidades das páginas, foi criado um mock inicial com várias informações relevantes, dentre elas as de usuário. Foi criado cinco usuários iniciais distribuídos nos três perfis existentes no sistema.

**Administrador**
* email: "adm@school.com",
  senha: "1234",

**Docente**
* email: "docente@school.com",
  senha: "1234",

**Aluno**
* email: "aluno@school.com",
  senha: "1234",



[//]: # "Essas informações estão salvas no arquivo 'usuarios.json'. Por isso, para a aplicação funcionar é necessário rodar o json server"


[//]: # "```json-server --watch src/db/usuarios.json --port 3000~```"


Para executar o sistema é necessário iniciar o servidor da aplicação


```ng serve```


E entrar no endereço informado. No meu caso é: http://localhost:4200/

## Funcionalidades

### Administradores
- **Cadastro de Docente:** Permite o cadastro de novos docentes, com validação de dados e busca de endereço por CEP.
- **Cadastro de Aluno:** Permite o cadastro de novos alunos, com validação de dados e busca de endereço por CEP.
- **Cadastro de Turma:** Permite criação de turmas.
- **Cadastro de Nota:** Permite o cadastro de notas para alunos.
- **Listagem de Docentes:** Exibe todos os docentes cadastrados, com uma barra de busca para facilitar a pesquisa. Possui funcionalidade de "Ver Mais" para edição e deleção de docentes.


### Docentes
- **Cadastro de Turma:** Permite criação de turmas para lecionar.
- **Cadastro de Nota:** Permite o cadastro de notas para os alunos que cursam suas aulas.

### Alunos
- **Notas:** Exibe o histórico de notas do aluno, categorizado por matéria e em ordem cronológica.



## Melhorias
- O aluno poderia ter acesso a sua média por matéria para acompanhar seu progresso
- Poderia ser acrescentado um status final se o aluno foi APROVADO ou REPROVADO
- O aluno poderia ter acesso às informações das matérias na qual ele está matriculado


## Informações finais
Este projeto foi desenvolvido para o curso FullStack [Education] para compor a nota do módulo.

O projeto está todo contido no repositório do gitHub: <https://github.com/FullStack-Education/M3P-FrontEnd-Squad5.git>

A organização das tarefas foi feita no Trello e pode ser conferida no quadro (board):
<https://trello.com/b/iAsC098Y/m3p-frontend-squad-5>

