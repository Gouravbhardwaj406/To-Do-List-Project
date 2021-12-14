
import { ERROR_MESSAGES, FILTERVALUES } from "./constants.js"

let projects = [];

const validateProject = function (project) {
  let error = [];
  if (!project.name) {
    error.push(ERROR_MESSAGES.PROJECT_NAME_NOT_PROVIDED);
  } else if (!project.technologyUsed) {
    error.push(ERROR_MESSAGES.TECHNOLOGY_USED_NOT_PROVIDED);
  } else if (!project.startingDate) {
    error.push(ERROR_MESSAGES.STARTING_DATE_NULL);
  } else if (!project.completionDate) {
    error.push(ERROR_MESSAGES.COMPLETION_DATE_NULL);
  } else {
    return true;
  }
  return error;
};

const clearInputs = function (inputname1, inputname2, inputname3, inputname4) {
  document.querySelector(inputname1).value = "";
  document.querySelector(inputname2).value = ""
  document.querySelector(inputname3).value = ""
  document.querySelector(inputname4).value = ""
};

const addProject = function (project) {
  project.status = "pending"
  projects.push(project);
};

const createTag = function (tagName, insidevalue, tagClass, outertag) {
  let temptag = document.createElement(tagName);
  temptag.innerHTML = insidevalue;
  temptag.className = tagClass;
  outertag.classList.add("uncompleted");
  outertag.appendChild(temptag);
  insidevalue = "";
};

const completeButton = (tagName, tagClass, buttonName, outertag, project) => {
  let buttons = document.createElement(tagName);
  buttons.className = tagClass;
  buttons.innerHTML = buttonName;
  outertag.appendChild(buttons);
  buttons.addEventListener("click", function () {
    project.status = "completed";
    console.log(projects);
    outertag.removeChild(buttons);
  });
};

const exitButton = function (tagName, tagClass, buttonName, outertag, project, parentdiv, childdiv) {
  let button = document.createElement(tagName);
  button.className = tagClass;
  button.innerHTML = buttonName;
  outertag.appendChild(button);
  button.addEventListener("click", function () {
    projects.splice(projects.indexOf(project), 1);
    parentdiv.removeChild(childdiv);
  });
};

const projectDiv = function (project, parentDiv) {
  let divtag = document.createElement("div");
  divtag.className = "heading1";
  parentDiv.appendChild(divtag);
  createTag("div", project.name, "box1", divtag);
  createTag("div", project.technologyUsed, "box2", divtag);
  createTag("div", project.startingDate, "box3", divtag);
  createTag("div", project.completionDate, "box4", divtag);
  let exitdiv = document.createElement("div");
  exitdiv.class = "box5";
  divtag.appendChild(exitdiv);
  if (project.status === "pending") {
    completeButton("BUTTON", "complete", "completed", exitdiv, project, parentDiv, divtag);
  }
  exitButton("BUTTON", "exitt", "Remove Project", exitdiv, project, parentDiv, divtag);
  clearInputs("#projectname", "#technology", "#starting-date", "#completion-date");
}

const displayProjects = function (filter) {
  let displayArray;
  if (filter === FILTERVALUES.ALL) {
    displayArray = projects;
  }else {
    displayArray = filterOptions(filter);
  }
  let mainDiv = document.querySelector("#container");
  mainDiv.innerHTML = "";
  for (let project of displayArray) {
    projectDiv(project, mainDiv);
  }
};

const filterOptions = function (filter) {
  return projects.filter(e => e.status === filter)
};

const filterProjects = function () {
  let filteroption = document.querySelector(".filter-todo1");
  filteroption.addEventListener("click", function (e) {
    displayProjects(e.target.value);
  });
};

export { projects, validateProject, addProject, clearInputs, filterOptions, displayProjects, filterProjects, completeButton, exitButton, createTag };
