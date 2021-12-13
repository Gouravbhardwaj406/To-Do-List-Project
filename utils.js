const {ERROR_MESSAGES,FILTERVALUES} = require("./constants");
let ALLPROJECTS = [];
VALIDATEINPUTS = function (name, technology, start, end) {
  if (!name) {
    alert(ERROR_MESSAGES.PROJECT_NAME_NOT_PROVIDED);
  } else if (!technology) {
    alert(ERROR_MESSAGES.TECHNOLOGY_USED_NOT_PROVIDED);
  } else if (!start) {
    alert(ERROR_MESSAGES.STARTING_DATE_NULL);
  } else if (!end) {
    alert(ERROR_MESSAGES.COMPLETION_DATE_NULL);
  } else {
    return true;
  }
};
CLEARINPUTS = function (inputname1,inputname2,inputname3,inputname4) {
  document.querySelector(inputname1).value = "";
  document.querySelector(inputname2).value = ""
  document.querySelector(inputname3).value = ""
  document.querySelector(inputname4).value = ""
};
MODIFYPROJECTS = function (projectName, technology, start, end) {
  let obj = {
    project: projectName,
    technologyUsed: technology,
    startDate: start,
    endDate: end,
    status: "pending",
  };
  ALLPROJECTS.push(obj);
};

CREATETAG = function (tagName, insidevalue, tagClass, outertag) {
  let temptag = document.createElement(tagName);

  temptag.innerHTML = insidevalue;
  temptag.className = tagClass;
  outertag.classList.add("uncompleted");
  outertag.appendChild(temptag);
  insidevalue = "";
};
CREATECOMPLETEBUTTON = (tagName, tagClass, buttonName, outertag, obj) => {
  let buttons = document.createElement(tagName);
  buttons.className = tagClass;
  buttons.innerHTML = buttonName;
  outertag.appendChild(buttons);
  buttons.addEventListener("click", function () {
    obj.status = "completed";
    console.log(ALLPROJECTS);
    outertag.removeChild(buttons);
  });
};

CREATEEXITBUTTON = function (
  tagName,
  tagClass,
  buttonName,
  outertag,
  obj,
  parentdiv,
  childdiv
) {
  let button = document.createElement(tagName);
  button.className = tagClass;
  button.innerHTML = buttonName;
  outertag.appendChild(button);
  button.addEventListener("click", function () {
    ALLPROJECTS.splice(ALLPROJECTS.indexOf(obj), 1);
    parentdiv.removeChild(childdiv);
  });
};

DISPLAYPROJECTS = function (arr) {
  let maindiv = document.querySelector("#container");
  maindiv.innerHTML = "";

  for (let obj of arr) {
    let divtag = document.createElement("div");
    divtag.className = "heading1";
    maindiv.appendChild(divtag);
    CREATETAG("div", obj.project, "box1", divtag);
    CREATETAG("div", obj.technologyUsed, "box2", divtag);
    CREATETAG("div", obj.startDate, "box3", divtag);
    CREATETAG("div", obj.endDate, "box4", divtag);
    let exitdiv = document.createElement("div");
    exitdiv.class = "box5";
    divtag.appendChild(exitdiv);

    if (obj.status === "pending") {
      CREATECOMPLETEBUTTON(
        "BUTTON",
        "complete",
        "completed",
        exitdiv,
        obj,
        maindiv,
        divtag
      );
    }
    CREATEEXITBUTTON(
      "BUTTON",
      "exitt",
      "Remove Project",
      exitdiv,
      obj,
      maindiv,
      divtag
    );
    CLEARINPUTS("#projectname","#technology","#starting-date","#completion-date");
   
  }
};

FILTEROPTIONS = function (filter) {
  return ALLPROJECTS.filter(e=>e.status===filter)

};

FILTERPROJECTS = function () {
  let filteroption = document.querySelector(".filter-todo1");
  filteroption.addEventListener("click", function (e) {
    if (e.target.value === FILTERVALUES.ALL) {
      DISPLAYPROJECTS(ALLPROJECTS);
    } else if (e.target.value === FILTERVALUES.COMPLETED) {
      DISPLAYPROJECTS(FILTEROPTIONS(FILTERVALUES.COMPLETED));
    } else {
      DISPLAYPROJECTS(FILTEROPTIONS(FILTERVALUES.PENDING));
    }
  });
};

module.exports = {ALLPROJECTS,VALIDATEINPUTS,MODIFYPROJECTS,CLEARINPUTS,FILTEROPTIONS,DISPLAYPROJECTS,FILTERPROJECTS,CREATECOMPLETEBUTTON,CREATEEXITBUTTON,CREATETAG};
