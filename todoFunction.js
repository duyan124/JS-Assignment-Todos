var items = [];
var id_count = 0;
var checked = [];
function addItem(event) {
    if (event.keyCode == 13) {
        var txt = document.getElementById("txt_todo").value;
        id = id_count;
        items.push({ txt, id });
        var newLi = document.createElement("li");
        newLi.className = "container__el";
        newLi.id = `li-${id}`;

        var newSubDiv = document.createElement("div");
        newSubDiv.className = "container__todo";

        var newCheckBox = document.createElement("input");
        newCheckBox.type = "checkbox";
        newCheckBox.className = "checkbox";
        newCheckBox.id = `id-${id}`;

        newPar = document.createElement("p");
        var newContent = document.createTextNode(txt);

        var newBtn = document.createElement("button");
        newBtn.className = "btn__del";
        newBtn.textContent = "x";
        newBtn.id = `${id}`;

        newPar.appendChild(newContent);
        newSubDiv.appendChild(newCheckBox);
        newSubDiv.appendChild(newPar);
        newLi.appendChild(newSubDiv);
        newLi.appendChild(newBtn);

        document.getElementById("txt_todo").value = " ";
        document.getElementById("items__left").textContent = `${items.length} `;

        var ul = document.getElementById("container__list");
        id_count++;
        newBtn.addEventListener("click", function () {
            this.parentNode.remove();
            const id = this.id;
            items = items.filter((e) => e.id != id);
            document.getElementById("items__left").textContent = `${items.length} `;
        });

        newCheckBox.addEventListener("click", function () {
            if (this.checked) {
                let idCheck = this.id;
                let id = idCheck.split("-")[1];
                checked.push(id);
                document.getElementById("items__left").textContent = `${items.length} `;
            } else {
                let idCheck = this.id;
                let id = idCheck.split("-")[1];
                checked = checked.filter((e) => e != id);
                document.getElementById("items__left").textContent = `${items.length} `;
            }
        });

        ul.appendChild(newLi);
    }
}

function delAll() {
    for (let i of checked) {
        let li = document.getElementById(`li-${i}`);
        li.parentNode.removeChild(li);
        items = items.filter((e) => e.id != +i);
    }
    console.log(items);
    checked.length = 0;
}
