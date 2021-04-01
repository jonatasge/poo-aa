import { PessoaCurso } from "./PessoaCurso.js";

export class Professor extends PessoaCurso {
  constructor(
    nome,
    endereco,
    telefone,
    cpf,
    salario,
    titulacao,
    areaDePesquisa
  ) {
    super(nome, cpf);

    this.endereco = endereco;
    this.telefone = telefone;
    this.salario = salario;
    this.titulacao = titulacao;
    this.areaDePesquisa = areaDePesquisa;
  }
}
