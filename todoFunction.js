let items = [];
let id_count = 0;
let state = "all";

function addItem(event) {
  if (event.keyCode == 13) {
    let txt = document.getElementById("txt_todo").value.trim();
    if (txt !== "") {
      let id = id_count;
      items.push({ txt, id, status: false });

      let newLi = document.createElement("li");
      newLi.className = "container__el";
      newLi.id = `li-${id}`;

      let newSubDiv = document.createElement("div");
      newSubDiv.className = "container__todo";

      let newCheckBoxDiv = document.createElement("div");
      newCheckBoxDiv.className = "round";

      let newLabel = document.createElement("label");
      newLabel.htmlFor = `id-${id}`;

      let newCheckBox = document.createElement("input");
      newCheckBox.type = "checkbox";
      newCheckBox.id = `id-${id}`;

      newCheckBoxDiv.appendChild(newCheckBox);
      newCheckBoxDiv.appendChild(newLabel);
      newCheckBox.addEventListener("click", checkCompleted);

      newText = document.createElement("input");
      newText.id = `txt-${id}`;
      newText.value = txt;
      newText.size = "50";

      newText.onkeypress = function ({ key }) {
        if (key === "Enter") hideInput(`txt-${id}`);
      };
      newText.onblur = function () {
        hideInput(`txt-${id}`);
      };

      let newPar = document.createElement("p");
      newPar.id = `p-${id}`;
      newPar.innerHTML = txt;
      newPar.addEventListener("dblclick", showInput);

      let newBtnDel = document.createElement("i");
      newBtnDel.className = "fas fa-times";
      newBtnDel.id = `${id}`;
      newBtnDel.onclick = function () {
        delOneItem(`${id}`);
      };

      newSubDiv.appendChild(newCheckBoxDiv);
      newSubDiv.appendChild(newPar);
      newSubDiv.appendChild(newText);
      newLi.appendChild(newSubDiv);
      newLi.appendChild(newBtnDel);

      document.getElementById("txt_todo").value = "";
      document.getElementById("items__left").textContent = `${
        items.filter((e) => e.status == false).length
      } `;

      let ul = document.getElementById("container__list");
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
  document.getElementById(`${id}`).style.display = "none"; //hide delete button
  this.style.display = "none"; //hide p
  id_text.style.display = "block";
  let val = this.innerHTML; //get text of p
  id_text.value = ""; //clear the value of the element
  id_text.value = val; //set that value back.
  id_text.focus(); //sets focus to element
}

function hideInput(str) {
  let text = document.getElementById(`${str}`);
  let id_text = document.getElementById(`${str}`).id.split("-")[1];

  document.getElementById(`p-${id_text}`).innerHTML = text.value;
  text.style.display = "none";
  document.getElementById(`p-${id_text}`).style.display = "block";
  document.getElementById(`${id_text}`).style.display = null;

  for (let item of items) {
    if (item.id == +id_text) item.txt = text.value;
  }
}

function checkCompleted() {
  let idCheck = this.id;
  let id = idCheck.split("-")[1];
  for (let item of items) {
    if (item.id == +id) item.status = !item.status;
  }

  document.getElementById(`p-${id}`).classList.toggle("completed__item");
  document.getElementById("items__left").textContent = `${
    items.filter((e) => !e.status).length
  } `;

  styleAllOption();
  styleClearCompleted();
  filterOption(state);
}

function delOneItem(btn_id) {
  items = items.filter((e) => e.id != btn_id);
  document.getElementById(`${btn_id}`).parentNode.remove();

  document.getElementById("items__left").textContent = `${
    items.filter((e) => !e.status).length
  } `;

  styleClearCompleted();
  styleAllOption();
}

function delAll() {
  items.map((item) => {
    if (item.status === true) delOneItem(item.id);
  });
}

function filterOption(status) {
  state = status;
  let cur_active = document.getElementsByClassName("active");
  cur_active[0].classList.remove("active");
  let btn_filter = document.getElementsByClassName("btn");

  items.map((item) => {
    let li = document.getElementById(`li-${item.id}`);

    if (state === "active") li.style.display = item.status ? "none" : null;
    else if (state === "completed")
      li.style.display = item.status ? null : "none";
    else li.style.display = null;
  });

  if (state === "active") {
    btn_filter[1].classList.add("active");
  } else if (status === "completed") {
    btn_filter[2].classList.add("active");
  } else {
    btn_filter[0].classList.add("active");
  }
}

function allOption() {
  let mustCheck = items.filter((item) => !item.status).length !== 0;
  items.map((item) => {
    item.status = mustCheck;
    document.getElementById(`id-${item.id}`).checked = mustCheck;
    if (mustCheck)
      document.getElementById(`p-${item.id}`).classList.add("completed__item");
    else
      document
        .getElementById(`p-${item.id}`)
        .classList.remove("completed__item");
  });

  document.getElementById("items__left").textContent = `${
    items.filter((item) => !item.status).length
  } `;
  styleAllOption();
  styleClearCompleted();
  filterOption(state);
}

function styleAllOption() {
  let footer__bar = document.getElementsByClassName("footer-bar");
  let _allOption = document.getElementById("allOption");

  _allOption.style.visibility = items.length > 0 ? "visible" : "hidden";
  footer__bar[0].style.display = items.length > 0 ? "flex" : "none";
  _allOption.style.color =
    items.length > 0 &&
    items.filter((e) => e.status == true).length == items.length
      ? "gray"
      : null;
}

function styleClearCompleted() {
  let btnClear = document.getElementsByClassName("btn__clear");
  btnClear[0].style.visibility =
    items.filter((e) => e.status).length > 0 ? "visible" : "hidden";
}