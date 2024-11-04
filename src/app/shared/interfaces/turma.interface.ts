export interface TurmaInterface {
    id: number;
    nome: string;
    dataInicio: string;
    dataTermino: string;
    horario: string;
    professor: string;
  }

// export interface TurmaInterface {
//   id: number;
//   nome: string;
//   dataInicio: string;
//   dataTermino: string;
//   horario: string;
//   professor: {
//     id: number;    // to store the professor's unique ID for backend requests
//     nome: string;  // for displaying professor's name in the frontend
//   };
// }