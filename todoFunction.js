var items = [];
var id_count = 0;
var state = 'all';
function addItem(event) {
  if (event.keyCode == 13) {
    var txt = document.getElementById("txt_todo").value.trim();
    id = id_count;
    items.push({ txt, id, status: false });

    var newLi = document.createElement("li");
    newLi.className = "container__el";
    newLi.id = `li-${id}`;

    var newSubDiv = document.createElement("div");
    newSubDiv.className = "container__todo";

    var newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.className = "checkbox";
    newCheckBox.id = `id-${id}`;

    newPar = document.createElement("input");
    newPar.id = `txt-${id}`;
    newPar.value = txt;
    newPar.disabled = true;
    newPar.addEventListener("blur", hideInput);

    var newDblBtn = document.createElement("button");
    newDblBtn.className = "btn__text";
    newDblBtn.id = `btn-${id}`;
    newDblBtn.addEventListener("dblclick", showInput);

    var newBtn = document.createElement("button");
    newBtn.className = "btn__del";
    newBtn.textContent = "x";
    newBtn.id = `${id}`;

    newDblBtn.appendChild(newPar);
    newSubDiv.appendChild(newCheckBox);
    newSubDiv.appendChild(newDblBtn);
    newLi.appendChild(newSubDiv);
    newLi.appendChild(newBtn);

    document.getElementById("txt_todo").value = " ";
    document.getElementById("items__left").textContent = `${
      items.filter((e) => e.status == false).length
    } `;

    var ul = document.getElementById("container__list");
    id_count++;
    newBtn.addEventListener("click", delOneItem);

    newCheckBox.addEventListener("click", checkCompleted);

    ul.appendChild(newLi);
  }
}
function showInput() {
  let id = this.id.split("-")[1];
  let ip = document.getElementById(`txt-${id}`);
  ip.disabled = false;
}

function hideInput() {
  this.disabled = true;
}

function checkCompleted() {
  let idCheck = this.id;
  let id = idCheck.split("-")[1];
  if (this.checked) {
    for (let item of items) {
      if (item.id == +id) item.status = true;
    }
    document.getElementById(`txt-${id}`).classList.add("input__completed");
  } else {
    for (let item of items) {
      if (item.id == +id) item.status = false;
    }
    document.getElementById(`txt-${id}`).classList.remove("input__completed");
  }
  document.getElementById("items__left").textContent = `${
    items.filter((e) => e.status == false).length
  } `;
  if (items.filter((e) => e.status == true).length == id_count)
    document.getElementById("allOption").style.color = "gray";
  else document.getElementById("allOption").style.color = null;

  filterOption(state);
}

function delOneItem() {
  this.parentNode.remove();
  const id = this.id;
  items = items.filter((e) => e.id != id);
  document.getElementById("items__left").textContent = `${
    items.filter((e) => e.status == false).length
  } `;
}
function delAll() {
  let arr = [];
  for (let item of items) {
    if (item.status == true) {
      let li = document.getElementById(`li-${item.id}`);
      li.parentNode.removeChild(li);
    } else {
      arr.push(item);
    }
  }
  items = arr;
}

function showAll() {
  for (let item of items) {
    let li = document.getElementById(`li-${item.id}`);
    li.style.display = null;
  }
}
function active() {
  for (let item of items) {
    let li = document.getElementById(`li-${item.id}`);
    if (item.status == true) {
      li.style.display = "none";
    } else {
      li.style.display = null;
    }
  }
}
function completed() {
  document.getElementsByClassName("btn");
  for (let item of items) {
    let li = document.getElementById(`li-${item.id}`);
    if (item.status == false) {
      li.style.display = "none";
    } else {
      li.style.display = null;
    }
  }
}
function filterOption(status) {
  state = status;
  if (status == "all") {
    showAll();
  }
  if (status == "active") {
    active();
  }
  if (status == "completed") {
    completed();
  }
}
function allOption() {
  if (items.filter((e) => e.status == false).length > 0) {
    for (let item of items) {
      if (item.status == false) {
        item.status = true;
        document.getElementById(`id-${item.id}`).checked = true;
        document
          .getElementById(`txt-${item.id}`)
          .classList.add("input__completed");
        document.getElementById("allOption").style.color = "gray";
      }
    }
    document.getElementById("items__left").textContent = `0 `;
  } else {
    for (let item of items) {
      if (item.status == true) {
        item.status = false;
        document.getElementById(`id-${item.id}`).checked = false;
        document
          .getElementById(`txt-${item.id}`)
          .classList.remove("input__completed");
        document.getElementById("allOption").style.color = null;
      }
    }
    document.getElementById("items__left").textContent = `${
      items.filter((e) => e.status == false).length
    } `;
  }
  filterOption(state);
}
