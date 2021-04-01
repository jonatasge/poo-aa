function showForm(form) {
  const types = form.toLowerCase().split("-");
  const id = types.length > 1 ? `add-${types[types.length - 1]}` : types[0];
  document.getElementById(id).removeAttribute("hidden");
}

function save() {
  event.stopPropagation();
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const types = type.split("-");

  const form = new FormData(event.target);
  let values = {};
  for (const [name, value] of form) values[name] = value;

  // CONVERTENDO VALORES EM INSTANCIA DO OBJETO
  const obj = newObject(types[types.length - 1], Object.values(values));
  const table = type;
  const db = initDataBase();

  if (table.includes("-")) {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");

    db.add(table, key, Object.values(obj)[0]);
  } else {
    db.set(table, obj[db.key(table)], values);
  }

  window.history.back();
}
window.save = save;

function setOptions(type) {
  const types = type.toLowerCase().split("-");
  const id = `add-${types[types.length - 1]}`;
  const select = document.getElementById(`${id}-select`);
  if (!select) return;

  const db = initDataBase();
  const table = db.get(types[types.length - 1]);

  const option = (v, t) => `<option value="${v}">${t}</option>`;
  const optionDefault = `<option value="" disabled selected>Selecione</option>`;

  select.innerHTML = `${optionDefault}\n${Object.values(table).reduce(
    (res, row) => {
      return `${res}\n${option(row[db.key(types[1])], row.nome)}`;
    },
    ""
  )}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if (!type) window.history.back();

  showForm(type);
  updateListeners(type);
  setOptions(type);
});
