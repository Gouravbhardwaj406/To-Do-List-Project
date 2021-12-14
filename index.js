import { projects, validateProject, addProject, clearInputs, filterOptions, displayProjects, filterProjects, completeButton, exitButton, createTag } from "./utils.js";
import { ERROR_MESSAGES, FILTERVALUES } from "./constants.js"
let addButton = document.querySelector("#addToDo");

let ProjectName = document.querySelector("#projectname");
let TechnologyUsed = document.querySelector("#technology");
let startDate, completeDate;

document
  .querySelector("#starting-date")
  .addEventListener("change", function () {
    startDate = this.value;
  });
document
  .querySelector("#completion-date")
  .addEventListener("change", function () {
    completeDate = this.value;
  });

addButton.addEventListener("click", function () {
  let project = {
    name: ProjectName.value,
    technologyUsed: TechnologyUsed.value,
    startingDate: startDate,
    completionDate: completeDate
  }
  let isvalid = validateProject(project);
  if (isvalid) {
    addProject(project);
    let filter = document.querySelector(".filter-todo1");
    let index = filter.selectedIndex;
    displayProjects(filter.options[index].value);

  }

});
filterProjects();
