class Database {
  #data;

  constructor() {
    this.#data = JSON.parse(localStorage.getItem("database"));
    if (!this.#data) localStorage.setItem("database", "{}");
  }

  get(table, key, keyCreate) {
    let value = this.#data[table];
    if (!value) value = this.#data[table] = {};
    if (key && !value[key]) value = this.#data[table][key] = keyCreate || {};
    else if (key) value = value[key];
    return value;
  }

  set(table, key, value) {
    let t = this.#data[table];
    if (!t) t = this.#data[table] = {};
    t[key] = value;
    return localStorage.setItem("database", JSON.stringify(this.#data));
  }

  key(table) {
    switch (table) {
      case "cursos":
      case "disciplinas":
        return "codigo";
      case "professores":
      case "alunos":
        return "cpf";
      case "professores-cursos":
      case "professores-cursos-disciplinas":
        return "professores";
    }
  }

  add(table, key, value) {
    const val = this.get(table, key, []);
    if (!val.includes(value)) {
      val.push(value);
      return this.set(table, key, val);
    }
    return false;
  }

  remove(table, key, value) {
    const val = this.get(table, key, []);
    const index = val.indexOf(value);
    if (index > -1) {
      val.splice(index, 1);
      return this.set(table, key, val);
    }
    return false;
  }
}
