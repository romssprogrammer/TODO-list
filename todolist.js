const newTask = document.querySelector(".new_task_button");
const newTaskForm = document.querySelector(".container_form");

const inputTitle = document.querySelector(".input_title");
const inputStatus = document.querySelector(".input_status");
const inputDeadLine = document.querySelector(".input_date");
const inputDescription = document.querySelector(".input_description");
const todoList = document.querySelector(".todo_items_list");
const btnAddTask = document.querySelector(".btn_add_task");
const btnSave = document.querySelector(".btn_save");
const addTag = document.querySelector(".add_tag");
const colorPicker = document.querySelector(".color_picker_tag");
const inputTag = document.querySelector(".tag_input");
const greeting_task_element = document.querySelector(
  ".greetting_task_number span"
);

function setCustomPickercolorColor(colorValue) {
  const colorInputContainer = document.querySelector(".color-input-container");
  colorInputContainer.style.backgroundColor = colorValue;
}
setCustomPickercolorColor("#ff002a");
colorPicker.addEventListener("input", (e) => {
  setCustomPickercolorColor(e.target.value || colorValue);
});

const defaultTagColor = "#d0c9e2";
let todoItemsArr = fetchTodoItemsfromLocalStorage();

const DeadlinestateManager = {
  deadlineValue: null,

  setInputDeadlineValue(value) {
    this.deadlineValue = value;
  },

  getInputDeadlineValue() {
    return this.deadlineValue;
  },
};

const tagObjectStateManager = {
  tagObject: {},
  setTagObject(value) {
    this.tagObject = value;
  },

  getTagObject() {
    return this.tagObject;
  },
};

const taskCountManager = {
  taskCount: null,
  setTaskCount(value) {
    this.setTaskCount = value;
  },
  getTaskCount(value) {
    return this.setTaskCount;
  },
};
const tagObjectArrayManager = {
  tagObjectArray: [],
  setTagObjectArray(value) {
    this.tagObjectArray.push(value);
  },
  getTagObjectArray() {
    return this.tagObjectArray;
  },
  clearTagObjectArray() {
    this.tagObjectArray = [];
  },
};

//TODO:filterByDate
function filterByDate() {}

loadTodoItem(todoItemsArr);
function loadTodoItem(todoItems) {
  if (taskCountManager.getTaskCount() > 1) {
    greeting_task_word(todoItems);
  }
  greeting_task_element.textContent = todoItems.length;
  for (const item of todoItems) {
    const todoItem = createTodoItem(item);
    todoList.appendChild(todoItem);
  }
}

function updateGreeting_task_word(todoItems) {
  taskCountManager.setTaskCount(todoItems.length);
  const greeting_task_word = document.querySelector(".task_word");
  greeting_task_word.textContent += "s";
  greeting_task_element.textContent = taskCountManager.getTaskCount();
}
function fetchTodoItemsfromLocalStorage() {
  try {
    const items = localStorage.getItem("todo-items");
    const itemArr = JSON.parse(items) || [];

    return itemArr;
  } catch (error) {
    console.error("there is nothing store in the local storage", error);
    // Specification return empty array
    // No item in the local storage
    return [];
  }
}

function saveTodoItems(items) {
  localStorage.setItem("todo-items", JSON.stringify(items));
}

function deleteTodoItem(idItem) {
  // delete item where Id =""
}
newTask.addEventListener("click", () => {
  openNewTaskForm();
});

function updateStatus(value, itemId) {
  todoItemsArr.filter((item) => {
    if (item.itemId === itemId) {
      item.status = value;
      saveTodoItems(todoItemsArr);
    }
  });
}

function updateDeadLine(value, itemId) {
  todoItemsArr.filter((item) => {
    if (item.itemId === itemId) {
      item.deadline = value;
      saveTodoItems(todoItemsArr);
    }
  });
}
// MARK: notification
// TODO: use notification API
function notification() {
  // TODO:determine if there is a deadline date closer to the current date
  // determine if there is a overdue task return an object
  // of those elements empty array otherwise
}
function updateTaskCount() {
  const updateItemArr = fetchTodoItemsfromLocalStorage();
  greeting_task_element.textContent = updateItemArr.length;
}
// MARK: createTodoItem
function createTodoItem(item = {}, itemId) {
  const liElement = document.createElement("li");
  try {
    liElement.classList.add("todo_LI");
    liElement.setAttribute("data-itemID", item.itemId || itemId);
    const mainInnerDivContainerTodoItem = document.createElement("div");
    mainInnerDivContainerTodoItem.classList.add(
      "main_inner_div_container_todo_item"
    );
    const containerTodoItem = document.createElement("div");
    containerTodoItem.classList.add("container_todo_items");
    const containerTodoNavBar = document.createElement("div");
    containerTodoNavBar.classList.add("container_todo_nav_bar");
    const ulTodoNavBar = document.createElement("ul");
    ulTodoNavBar.classList.add("todo_nav_bar");
    //------------------------------------
    //li to add in ulTodoNavBar
    //------<li deadline container>----------
    const liDeadlineElement = document.createElement("li");
    liDeadlineElement.classList.add("deadline_container");
    const deadlineIcon = document.createElement("img");
    deadlineIcon.setAttribute("src", "assets/alarm_clock_14px.png");
    deadlineIcon.setAttribute("alt", "alarm clock");

    //------< deadlineUpdateIcon>----------
    const deadlineUpdateIcon = document.createElement("img");
    deadlineUpdateIcon.setAttribute("src", "assets/Plus_12px.png");
    deadlineUpdateIcon.classList.add("deadline_Update_Icon");
    deadlineUpdateIcon.setAttribute("alt", "UpdateIcon");
    deadlineUpdateIcon.classList.add("hide_update_icon");

    //------</ deadlineUpdateIcon>----------

    const labelDeadlineEl = document.createElement("label");
    labelDeadlineEl.textContent = "Deadline";

    const deadlineDateLabelElement = document.createElement("p");
    deadlineDateLabelElement.classList.add("deadline_date");

    const deadlineDateSpanElement = document.createElement("span");
    deadlineDateSpanElement.classList.add("deadline_date_span");
    deadlineDateLabelElement.appendChild(deadlineDateSpanElement);
    //REFACTOR
    function createDeadLineElement() {}
    const inputDeadlineElement = document.createElement("input");
    inputDeadlineElement.classList.add("input_deadline_date");
    inputDeadlineElement.classList.add("hide_input_deadline_date");
    inputDeadlineElement.addEventListener("change", () => {
      deadlineUpdateIcon.classList.remove("hide_update_icon");
    });
    //------< setInputDeadlineValue>----------
    inputDeadlineElement.addEventListener("change", (e) => {
      DeadlinestateManager.setInputDeadlineValue(e.target.value);
    });

    deadlineUpdateIcon.addEventListener("click", (e) => {
      const deadlineValue = DeadlinestateManager.getInputDeadlineValue();
      if (deadlineValue) {
        const deadLineItemID = e.target.closest(".todo_LI").dataset.itemid;

        const deadLineItem = e.target.closest(".todo_LI");
        const dayleftEl = deadLineItem.querySelector(".day_left_label span");
        console.log(dayleftEl);
        deadlineDateSpanElement.textContent = deadlineValue;
        inputDeadlineElement.classList.toggle("hide_input_deadline_date");
        deadlineDateLabelElement.classList.toggle("hide_deadline_date");
        deadlineUpdateIcon.classList.add("hide_update_icon");
        updateDeadLine(deadlineValue, deadLineItemID);
        updateDaysleftFromItemInput(deadLineItemID, e.target.value);
        console.log(deadlineValue);
        updateDaysleftLabel(dayleftEl, calculeDateLeft(deadlineValue));
      }
    });

    //MARK: updatedaysleftDeadLineLabel
    function updateDaysleftFromItemInput(itemId, value) {
      const daysleft = calculeDateLeft(value);

      // TODO update LABEL
      todoItemsArr.filter((item) => {
        if (item.itemId === itemId) {
          item.daysLeft = daysleft;
          saveTodoItems(todoItemsArr);
        }
      });
    }

    function updateDaysleftLabel(elementToUpdate, value) {
      elementToUpdate.textContent = value;
    }

    const editDeadlineIconButton = document.createElement("img");
    editDeadlineIconButton.classList.add("edit_deadline_item");
    editDeadlineIconButton.setAttribute("src", "assets/pencil_14px.png");
    editDeadlineIconButton.setAttribute("alt", "pencil");

    inputDeadlineElement.setAttribute("type", "date");
    liDeadlineElement.appendChild(deadlineIcon);
    liDeadlineElement.appendChild(labelDeadlineEl);
    liDeadlineElement.appendChild(deadlineDateLabelElement);
    deadlineDateSpanElement.textContent = item.deadline;
    editDeadlineIconButton.addEventListener("click", () => {
      inputDeadlineElement.classList.toggle("hide_input_deadline_date");
      deadlineDateLabelElement.classList.toggle("hide_deadline_date");
    });
    liDeadlineElement.appendChild(inputDeadlineElement);
    liDeadlineElement.appendChild(deadlineUpdateIcon);
    liDeadlineElement.appendChild(editDeadlineIconButton);
    if (item.daysleft > 0) {
      liDeadlineElement.appendChild(createDayLeftElement(item));
    }
    //------</ deadline container>----------
    //------------------------------------
    //li <status container>
    function createStatusElement() {
      const liStatusElement = document.createElement("li");
      liStatusElement.classList.add("status_container");
      const statusIcon = document.createElement("img");
      statusIcon.setAttribute("src", "assets/Checkmark_14px.png");
      statusIcon.setAttribute("alt", "Checkmark");
      const inputStatusElement = document.createElement("input");
      inputStatusElement.classList.add("input_status");
      inputStatusElement.setAttribute("type", "checkbox");
      inputStatusElement.checked = item.status || false;
      const labelStatusElement = document.createElement("label");
      labelStatusElement.textContent = "Done";
      liStatusElement.appendChild(statusIcon);
      liStatusElement.appendChild(labelStatusElement);
      liStatusElement.appendChild(inputStatusElement);
      return {
        liStatusHtmlTag: liStatusElement,
        inputStatusHtmlTag: inputStatusElement,
      };
    }
    const { liStatusHtmlTag, inputStatusHtmlTag } = createStatusElement();
    inputStatusHtmlTag.addEventListener("click", (e) => {
      const checkboxElementId = e.target.closest(".todo_LI").dataset.itemid;

      const checkboxValue = e.target.value;
      updateStatus(e.target.checked, checkboxElementId);
    });
    //</li status container>
    //li <tag container>
    const liTagElement = document.createElement("li");
    liTagElement.classList.add("tag_container");
    const tagIcon = document.createElement("img");
    tagIcon.classList.add("icon_tag");
    tagIcon.setAttribute("src", "assets/ticket_14px.png");
    tagIcon.setAttribute("alt", "activity_feed");
    //addTagIcon
    const addTagIcon = document.createElement("img");
    addTagIcon.classList.add("icon_tag");
    addTagIcon.setAttribute("src", "assets/new_ticket_14px.png");

    const spanTagElement = document.createElement("span");
    spanTagElement.classList.add("tag_label");
    spanTagElement.textContent = "Tag";
    const editTagIcon = document.createElement("img");
    editTagIcon.setAttribute("src", "assets/pencil_14px.png");
    editTagIcon.setAttribute("alt", "pencil");

    addTagIcon.classList.add("icon_tag");
    const editTagInput = document.createElement("input");
    editTagInput.classList.add("input_edit_tag");
    editTagInput.classList.add("hide_input_edit_tag");
    editTagInput.setAttribute("type", "text");
    editTagInput.setAttribute("placeholder", "enter a tag name");

    liTagElement.appendChild(spanTagElement);
    liTagElement.appendChild(addTagIcon);
    liTagElement.appendChild(editTagInput);
    liTagElement.appendChild(editTagIcon);
    //li </tag container>
    // TODO: deleteTagIcon
    editTagIcon.addEventListener("click", () => {});
    // Main container: container_todo_nav_bar
    ulTodoNavBar.appendChild(liDeadlineElement);
    ulTodoNavBar.appendChild(liStatusHtmlTag);
    ulTodoNavBar.appendChild(liTagElement);
    containerTodoNavBar.appendChild(ulTodoNavBar);

    const todoItemInfo = document.createElement("div");
    todoItemInfo.classList.add("todo_item_info");
    const titleTodoItem = document.createElement("h3");
    titleTodoItem.textContent = item.title;
    const descriptionTodoItem = document.createElement("p");
    descriptionTodoItem.textContent = item.description;
    const deleteTodoItem = document.createElement("span");
    deleteTodoItem.classList.add("delete_todo_item");
    deleteTodoItem.textContent = "x";
    // TODO: REFACTOR
    deleteTodoItem.addEventListener("click", (e) => {
      e.target.closest(".todo_LI");
      const itemID = e.target.closest(".todo_LI").dataset.itemid;
      const itemElement = e.target.closest(".todo_LI");
      for (let i = 0; i < todoItemsArr.length; i++) {
        if (todoItemsArr[i].itemId === itemID) {
          todoItemsArr.splice(i, 1);
        }
      }
      saveTodoItems(todoItemsArr);
      itemElement.remove();
      updateTaskCount();
    });

    todoItemInfo.appendChild(titleTodoItem);
    todoItemInfo.appendChild(descriptionTodoItem);

    containerTodoItem.appendChild(containerTodoNavBar);
    containerTodoItem.appendChild(todoItemInfo);
    containerTodoItem.appendChild(deleteTodoItem);
    mainInnerDivContainerTodoItem.appendChild(containerTodoItem);
    // mainInnerDivContainerTodoItem.appendChild();

    const tagListElement = document.createElement("ul");
    tagListElement.classList.add("tags_list");
    if (item.tag.length > 0) {
      try {
        for (const _item of item.tag) {
          const liTag = createTag(_item);
          tagListElement.appendChild(liTag);
        }
      } catch (error) {
        console.error(error);
      }
    }
    // const liTagListElement = document.createElement("li");

    if (item.daysLeft > 0) {
    }
    liElement.appendChild(mainInnerDivContainerTodoItem);
    liElement.appendChild(tagListElement);
  } catch (e) {
    console.error(e);
  }
  return liElement;
}

function openNewTaskForm() {
  newTaskForm.classList.toggle("hide_new_task_form");
}

function edit_Tag() {
  // const tagInput = document.querySelector(".input_edit_tag");
  // tagInput.classList.toggle("hide_input_edit_tag");
}

//MARK:createDayLeftElement
function createDayLeftElement(item) {
  const DayleftElement = document.createElement("p");
  DayleftElement.classList.add("day_left_label");
  const DayleftSpanElement = document.createElement("span");
  DayleftSpanElement.textContent = `${item.daysleft} ${
    item.daysleft > 1 ? "days left" : "day left"
  }`;
  DayleftElement.appendChild(DayleftSpanElement);
  return DayleftElement;
}

//MARK:createTag
function createTag(item) {
  const liTagElement = document.createElement("li");
  liTagElement.classList.add("tag");
  liTagElement.classList.add("tag_style");
  liTagElement.style.backgroundColor = item.color || colorPicker.value;
  liTagElement.style.borderRadius = "25% 10%";
  const spanTagElement = document.createElement("span");
  spanTagElement.classList.add("span_Tag");
  spanTagElement.textContent = "#" + item.tagName || inputTag.value;
  liTagElement.appendChild(spanTagElement);
  return liTagElement;
}

inputDeadLine.addEventListener("change", (e) => {
  const chooseDate = new Date(e.target.value);
  if (chooseDate < new Date()) {
    inputDeadLine.style.color = "red";
    console.log("select recent date");
  } else {
    inputDeadLine.style.color = "#fafaf9";
  }
});
//MARK: addTag
addTag.addEventListener("click", () => {
  const tagObject = {
    tagName: inputTag.value,
    color: colorPicker.value || defaultTagColor,
  };
  if (tagObject.tagName && tagObject.color) {
    tagObjectArrayManager.setTagObjectArray(tagObject);
  }
  inputTag.value = "";
});
//MARK: AddTask
btnAddTask.addEventListener("click", function (e) {
  const itemId = crypto.randomUUID();

  const todoItem = {
    itemId: itemId,
    title: inputTitle.value,
    description: inputDescription.value,
    status: 0,
    deadline: inputDeadLine.value,
    tag: [],
    daysleft: "",
    subtask: [],
  };
  // Notes perso: Peu être géré autrement par des validations de formulaire

  if (inputTitle.value) {
    todoItem.tag = [...tagObjectArrayManager.getTagObjectArray()];
    tagObjectArrayManager.clearTagObjectArray();

    if (inputDeadLine.value) {
      // Convertir la différence en jours
      todoItem.daysleft = calculeDateLeft(todoItem);
    }
    todoItemsArr.push(todoItem);
    saveTodoItems(todoItemsArr);
    todoList.appendChild(createTodoItem(todoItem, itemId));
    inputTitle.value = "";
    inputDeadLine.value = "";
    inputDescription.value = "";
  }
  // if (new Date(todoItem.dealine) != new Date()) {
  // }
  // setTodoItems();
  updateTaskCount();
});
function calculeDateLeft(item = {}, currentItemUpdateValue = 0) {
  let deadline;
  const currentDate = new Date();
  deadline = new Date(
    item.deadline || inputDeadLine.value || currentItemUpdateValue
  );
  const difference = deadline - currentDate;
  let daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return daysLeft;
}

class Task {
  constructor(name, estimatedTime) {
    this.name = name;
    this.estimatedTime = estimatedTime;
    this.completed = false;
    this.actualTime = 0; // Temps réellement passé
  }

  markAsCompleted(actualTime) {
    this.completed = true;
    this.actualTime = actualTime;
  }

  getAccuracyScore() {
    if (this.completed) {
      const accuracy =
        1 - Math.abs(this.actualTime - this.estimatedTime) / this.estimatedTime;
      return Math.max(accuracy, 0); // Score entre 0 et 1
    }
    return 0; // La tâche n'est pas encore complétée
  }
}

// Exemple d'utilisation
// const task1 = new Task("Faire une présentation", 120); // Estimation de 2 heures
// const task2 = new Task("Répondre aux e-mails", 30); // Estimation de 30 minutes

// // Simulation de la complétion des tâches
// task1.markAsCompleted(110); // Tâche terminée en 1 heure et 50 minutes
// task2.markAsCompleted(40); // Tâche terminée en 40 minutes

// // Affichage des scores d'exactitude
// console.log(`${task1.name}: Score d'exactitude - ${task1.getAccuracyScore()}`);
// console.log(`${task2.name}: Score d'exactitude - ${task2.getAccuracyScore()}`);
