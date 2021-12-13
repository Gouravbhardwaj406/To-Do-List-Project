const{ALLPROJECTS,VALIDATEINPUTS,MODIFYPROJECTS,CLEARINPUTS,FILTEROPTIONS,DISPLAYPROJECTS,FILTERPROJECTS,CREATECOMPLETEBUTTON,CREATEEXITBUTTON,CREATETAG} = require("./utils");

let getAddToDoButton = document.querySelector("#addToDo");

let ProjectName = document.querySelector("#projectname");
let TechnologyUsed = document.querySelector("#technology");
let startDate, completionDate;

document
  .querySelector("#starting-date")
  .addEventListener("change", function () {
    startDate = this.value;
  });
document
  .querySelector("#completion-date")
  .addEventListener("change", function () {
    completionDate = this.value;
  });

getAddToDoButton.addEventListener("click", function () {
  let valid = VALIDATEINPUTS(
    ProjectName.value,
    TechnologyUsed.value,
    startDate,
    completionDate
  );
  if (valid) {
    MODIFYPROJECTS(
      ProjectName.value,
      TechnologyUsed.value,
      startDate,
      completionDate
    );
    console.log(ALLPROJECTS);
    let filter = document.querySelector(".filter-todo1");
    let index = filter.selectedIndex;
    console.log(filter.options[index].value);
    if (filter.options[index].value === "all") {
      DISPLAYPROJECTS(ALLPROJECTS);
    } else {
      DISPLAYPROJECTS(FILTEROPTIONS(filter.options[index].value));
    }
  }
});

FILTERPROJECTS();
