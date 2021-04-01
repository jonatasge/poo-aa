export class Curso {
  #disciplinas = [];

  constructor(codigo, nome, duracao) {
    this.codigo = codigo;
    this.nome = nome;
    this.duracao = duracao;
  }

  addDisciplina(codigo) {
    if (this.#disciplinas.indexOf(codigo) < 0) {
      return this.#disciplinas.push(codigo);
    }
    return false;
  }

  listDisciplinas() {
    return this.#disciplinas;
  }

  removeDisciplina(codigo) {
    const index = this.#disciplinas.indexOf(codigo);
    if (index > -1) {
      return this.#disciplinas.splice(index, 1);
    }
    return false;
  }
}
