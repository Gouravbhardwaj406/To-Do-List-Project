const{ALLPROJECTS,VALIDATEINPUTS,MODIFYPROJECTS,CLEARINPUTS,FILTEROPTIONS,DISPLAYPROJECTS,FILTERPROJECTS,CREATECOMPLETEBUTTON,CREATEEXITBUTTON,CREATETAG} = require("./utils");

let getAddToDoButton = document.querySelector("#addToDo");

let getProjectName = document.querySelector("#projectname");
let getTechnologyUsed = document.querySelector("#technology");
let start, end;

document
  .querySelector("#starting-date")
  .addEventListener("change", function () {
    start = this.value;
  });
document
  .querySelector("#completion-date")
  .addEventListener("change", function () {
    end = this.value;
  });

getAddToDoButton.addEventListener("click", function () {
  let valid = VALIDATEINPUTS(
    getProjectName.value,
    getTechnologyUsed.value,
    start,
    end
  );
  if (valid) {
    MODIFYPROJECTS(
      getProjectName.value,
      getTechnologyUsed.value,
      start,
      end
    );
    console.log(ALLPROJECTS);
    let fil = document.querySelector(".filter-todo1");
    let ind = fil.selectedIndex;
    console.log(fil.options[ind].value);
    if (fil.options[ind].value === "all") {
      DISPLAYPROJECTS(ALLPROJECTS);
    } else {
      DISPLAYPROJECTS(FILTEROPTIONS(fil.options[ind].value));
    }
  }
});

FILTERPROJECTS();
