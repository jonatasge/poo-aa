import { PessoaCurso } from "./PessoaCurso.js";

export class Aluno extends PessoaCurso {
  constructor(nome, matricula, cpf, curso) {
    super(nome, cpf);

    this.nome = nome;
    this.matricula = matricula;
    this.curso = curso;
  }
}
