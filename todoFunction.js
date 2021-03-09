var items = [];
var id_count = 0;
var state = "all";

function addItem(event) {
  if (event.keyCode == 13) {
    var txt = document.getElementById("txt_todo").value.trim();
    if (txt != "") {
      id = id_count;
      items.push({ txt, id, status: false });

      var newLi = document.createElement("li");
      newLi.className = "container__el";
      newLi.id = `li-${id}`;

      var newSubDiv = document.createElement("div");
      newSubDiv.className = "container__todo";

      var newCheckBoxDiv = document.createElement("div");
      newCheckBoxDiv.className = "round";
      var newLabel = document.createElement("label");
      newLabel.htmlFor = `id-${id}`;
      var newCheckBox = document.createElement("input");
      newCheckBox.type = "checkbox";
      newCheckBox.id = `id-${id}`;

      newCheckBoxDiv.appendChild(newCheckBox);
      newCheckBoxDiv.appendChild(newLabel);
      newCheckBox.addEventListener("click", checkCompleted);

      newText = document.createElement("input");
      newText.id = `txt-${id}`;
      newText.value = txt;
      newText.size = "50";
      newText.addEventListener("blur", hideInput);

      var newPar = document.createElement("p");
      newPar.id = `p-${id}`;
      newPar.innerHTML = txt;
      newPar.addEventListener("dblclick", showInput);

      var newBtnDel = document.createElement("i");
      newBtnDel.className = "fas fa-times";
      newBtnDel.id = `${id}`;
      newBtnDel.addEventListener("click", delOneItem);

      newSubDiv.appendChild(newCheckBoxDiv);
      newSubDiv.appendChild(newPar);
      newSubDiv.appendChild(newText);
      newLi.appendChild(newSubDiv);
      newLi.appendChild(newBtnDel);

      document.getElementById("txt_todo").value = "";
      document.getElementById("items__left").textContent = `${
        items.filter((e) => e.status == false).length
      } `;

      var ul = document.getElementById("container__list");
      id_count++;
      ul.appendChild(newLi);
      styleAllOption();
      filterOption(state);
    }
  }
}
function showInput() {
  let id = this.id.split("-")[1];
  let id_text = document.getElementById(`txt-${id}`);
  document.getElementById(`p-${id}`).style.display = "none";
  id_text.style.display = "block";
  var val = document.getElementById(`p-${id}`).innerHTML;
  id_text.focus(); //sets focus to element
  id_text.value = ""; //clear the value of the element
  id_text.value = val; //set that value back.
}

function hideInput() {
  let id = this.id.split("-")[1];
  let id_text = document.getElementById(`txt-${id}`);
  document.getElementById(`p-${id}`).innerHTML = id_text.value;
  this.style.display = "none";
  document.getElementById(`p-${id}`).style.display = "block";
}

function checkCompleted() {
  let idCheck = this.id;
  let id = idCheck.split("-")[1];

  if (this.checked) {
    for (let item of items) {
      if (item.id == +id) item.status = true;
    }
    document.getElementById(`p-${id}`).classList.add("completed__item");
  } else {
    for (let item of items) {
      if (item.id == +id) item.status = false;
    }
    document.getElementById(`p-${id}`).classList.remove("completed__item");
  }

  document.getElementById("items__left").textContent = `${
    items.filter((e) => e.status == false).length
  } `;

  styleAllOption();
  styleClearCompleted();
  filterOption(state);
}

function styleAllOption() {
  let footer__bar = document.getElementsByClassName("footer-bar");
  let _allOption = document.getElementById("allOption");
  if (items.length > 0) {
    _allOption.style.visibility = "visible";
    footer__bar[0].style.display = "flex";
    if (items.filter((e) => e.status == true).length == items.length)
      _allOption.style.color = "gray";
    else _allOption.style.color = null;
  } else {
    _allOption.style.visibility = "hidden";
    footer__bar[0].style.display = "none";
  }
}

function styleClearCompleted() {
  let btnClear = document.getElementsByClassName("btn__clear");
  if (items.filter((e) => e.status == true).length > 0) {
    btnClear[0].style.visibility = "visible";
  } else btnClear[0].style.visibility = "hidden";
}

function delOneItem() {
  this.parentNode.remove();
  const id = this.id;
  items = items.filter((e) => e.id != id);
  document.getElementById("items__left").textContent = `${items.filter((e) => e.status == false).length} `;
  styleClearCompleted();
  styleAllOption();
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
  styleClearCompleted();
  styleAllOption();
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
  let cur_active = document.getElementsByClassName("active");
  cur_active[0].classList.remove("active");
  let btn_filter = document.getElementsByClassName("btn");
  if (status == "all") {
    btn_filter[0].classList.add("active");
    showAll();
  }
  if (status == "active") {
    btn_filter[1].classList.add("active");
    active();
  }
  if (status == "completed") {
    btn_filter[2].classList.add("active");
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
          .getElementById(`p-${item.id}`)
          .classList.add("completed__item");
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
          .getElementById(`p-${item.id}`)
          .classList.remove("completed__item");
        document.getElementById("allOption").style.color = null;
      }
    }
    document.getElementById("items__left").textContent = `${
      items.filter((e) => e.status == false).length
    } `;
  }
  styleAllOption();
  styleClearCompleted();
  filterOption(state);
}
