function getColorOfType(type) {
  return (() => {
    switch (type.toLowerCase()) {
      case "cursos":
        return "deep-orange lighten-2";
      case "disciplinas":
        return "amber lighten-2";
      case "professores":
        return "teal lighten-2";
      case "alunos":
        return "light-blue lighten-2";
    }
  })().split(" ");
}

function toCapitalize(text) {
  return `${text[0].toUpperCase()}${text.substr(1).toLowerCase()}`;
}

function updateListeners(type, callback) {
  const listeners = document.querySelectorAll("[data-listen]");
  const types = type.split("-");

  listeners.forEach((listener) => {
    const what = listener.getAttribute("data-listen").toLowerCase();

    switch (what) {
      case "type/text":
        return (listener.innerText = toCapitalize(type.replace(/-/g, "/")));
      case "type/color":
        return getColorOfType(types[0]).forEach((color) =>
          listener.classList?.add(color)
        );
      case "type/img":
        return listener.setAttribute(
          "src",
          `/src/assets/icons/${types[0]}.svg`
        );
      case "type/data/keys":
      case "type/data/values":
        return callback(listener, what);
      case "type/href":
        return listener.setAttribute(
          "href",
          `/cadastro/${window.location.search}`
        );
    }
  });
}

function initDataBase() {
  if (!window.db) {
    if (typeof Database !== "undefined") {
      return (window.db = new Database());
    }
    return;
  }
  return window.db;
}
window.initDataBase = initDataBase;

function newObject(type, values) {
  switch (type.toLowerCase()) {
    case "cursos":
      return new Curso(...values);
    case "disciplinas":
      return new Disciplina(...values);
    case "professores":
      return new Professor(...values);
    case "alunos":
      return new Aluno(...values);
  }
}
window.newObject = newObject;

document.addEventListener("DOMContentLoaded", function () {
  // Init Data Base
  initDataBase();

  // Init sidenavs
  const sidenavs = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenavs, {});
});
