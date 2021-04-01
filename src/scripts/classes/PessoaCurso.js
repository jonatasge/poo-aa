import { Pessoa } from "./Pessoa.js";

export class PessoaCurso extends Pessoa {
  #cursos = {};

  constructor(nome, cpf) {
    super(nome, cpf);
  }

  // DISCIPLINA
  addDisciplina(cursoCodigo, codigo) {
    if (!this.#cursos[cursoCodigo]) {
      this.#cursos[cursoCodigo] = { disciplinas: [] };
    }

    const curso = this.#cursos[cursoCodigo];
    if (curso.indexOf(codigo) < 0) {
      return curso.push(codigo);
    }

    return false;
  }

  listDisciplinas(codigo) {
    const cursos = codigo
      ? [this.#cursos[codigo]]
      : Object.values(this.#cursos);

    return cursos.reduce((disciplinas, curso) => {
      disciplinas.push(...curso.disciplinas);
      return disciplinas;
    }, []);
  }

  removeDisciplina(cursoCodigo, codigo) {
    const curso = this.#cursos[cursoCodigo];
    const index = curso?.indexOf(codigo);
    if (index > -1) {
      return curso.splice(index, 1);
    }

    return false;
  }
  // END DISCIPLINA

  // CURSO
  addCurso(codigo) {
    if (!this.#cursos[codigo]) {
      return (this.#cursos[codigo] = { disciplinas: [] });
    }

    return false;
  }

  removeCurso(codigo) {
    if (this.#cursos[codigo]) {
      return delete this.#cursos[codigo];
    }
    return false;
  }
  // END CURSO
}
