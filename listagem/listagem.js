function setDataKeys(listener, type) {
  const keys = (() => {
    switch (type?.toLowerCase()) {
      case "cursos":
        return ["Código", "Nome", "Duração (períodos)"];
      case "disciplinas":
        return ["Código", "Nome", "Carga horária"];
      case "professores":
        return [
          "Nome",
          "Endereço",
          "Telefone",
          "CPF",
          "Salário",
          "Titulação",
          "Área de pesquisa",
          "Cursos",
        ];
      case "alunos":
        return ["Nome", "Matrícula", "CPF", "Curso", "Disciplinas"];
      case "professores-cursos":
        return ["Código", "Nome", "Duração", "Disciplinas"];
      case "professores-cursos-disciplinas":
        return ["Código", "Nome", "Carga horária"];
      case "alunos-disciplinas":
        return ["Código", "Nome", "Carga horária"];
    }
  })();

  listener.innerHTML = keys.reduce((r, key) => {
    return `${r}\n<th>${key}</th>`;
  }, "");
}

function setDataValues(listener, type, key) {
  const db = initDataBase();
  const table = db.get(type, key[0]);

  listener.innerHTML = Object.values(table).reduce((res, row) => {
    const types = type.split("-");
    const tb = types[types.length - 1];
    
    if (type.includes("-")) row = db.get(tb, row);
    
    // CONVERTENDO VALORES EM INSTANCIA DO OBJETO
    const obj = newObject(tb, Object.values(row));
    const vals = Object.values(obj);
    let values = vals.reduce((r, val) => `${r}\n<td>${val}</td>`, "");
    values = addActions(type, values, row, db);

    return `${res}\n<tr>\n${values}</tr>`;
  }, "");
}

function addActions(type, values, row, db) {
  const params = new URLSearchParams(window.location.search);
  const key = params.getAll("key");
  const keys = key.reduce((r, k) => `${r}&key=${k}`, "");
  const types = type.split("-");

  let href;
  switch (type) {
    case "professores":
      href = `/listagem/?type=professores-cursos&key=${row[db.key(type)]}`;
      return (values += `\n<td><a href="${href}">Ver cursos</a></td>`);
    case "professores-cursos":
      href = `/listagem/?type=professores-cursos-disciplinas${keys}&key=${
        row[db.key(types[types.length - 1])]
      }`;
      return (values += `\n<td><a href="${href}">Ver disciplinas</a></td>`);
    case "alunos":
      href = `/listagem/?type=alunos-disciplinas&key=${row[db.key(type)]}`;
      return (values += `\n<td><a href="${href}">Ver disciplinas</a></td>`);
    default:
      return values;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const key = params.getAll("key");

  if (!type) window.history.back();

  updateListeners(type, (listener, what) => {
    switch (what) {
      case "type/data/keys":
        return setDataKeys(listener, type);
      case "type/data/values":
        return setDataValues(listener, type, key);
    }
  });
});
