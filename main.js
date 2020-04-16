const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
// let toDoList = [];
const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]")
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

//Select which list ID was selected
listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});
//Check selected tasks to update number of tasks
tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
    save()
    renderTaskCount(selectedList)
  }
})
//Deleted selected tasks from list
clearCompleteTasksButton.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveAndRender()
})
//Deleted active/selected list
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});
//Create new list
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});
//Create new task,push it to array,
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks.push(task)
  saveAndRender();
});

// //Change bacground color for odd tasks
// const addBackground = () => {
//   const odd = document.querySelectorAll("wrapper div:nth-child(odd)"); // zamiast div bylo li
//   for (let i = 0; i < odd.length; i++) {
//     odd[i].style.backgroundColor = "#f4f4f4";
//   }
// };

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  };
}

function createTask(name, time) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false,
    time: time
  };
}
//Only functions call
function saveAndRender() {
  save();
  render();
}
//Function which save lists to loacalstorage
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); //saving lists
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId); //saving selected list ID
}
//Show and hide active list
function render() {
  clearElement(listsContainer);
  renderLists();
  const selectedList = lists.find((list) => list.id === selectedListId);
  //if list is activ hide or show tasks list
  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name.toUpperCase();
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}
//Create new task
function renderTasks(selectedList, time) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true) //import template from html, true - to import all inside of div
    const checkBox = taskElement.querySelector('input')
    checkBox.id = task.id
    checkBox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    // const clock = document.createElement("div");
    // const timeFun = timeSet(time)
    // clock.innerHTML = timeFun
    // taskElement.appendChild(clock)
    const date = taskElement.querySelector('.date')
    date.append(timeSet(time))
    // timeSet()
    tasksContainer.appendChild(taskElement)
  })
}
//Import date and time task was added
function timeSet() {
  const taskElement = document.importNode(taskTemplate.content, true) //import template from html, true - to import all inside of div
  const date = taskElement.querySelector('.date')
  const time = new Date();
  const seconds =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  const minutes =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  const day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  const month =
    time.getMonth() + 1 < 10 ?
    "0" + (time.getMonth() + 1) :
    time.getMonth() + 1;
  const year =
    time.getFullYear() < 10 ? "0" + time.getFullYear() : time.getFullYear();
  date.innerHTML = `${hours} : ${minutes} : ${seconds} || ${day} - ${month} - ${year} r.`;
  tasksContainer.appendChild(taskElement)

}
// timeSet()
//Counting number of tasks without selected/deleted tasks
function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}
//Create new list
function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
render();

//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------


// const inputSearch = document.querySelector(".search");
// const inputAdd = document.querySelector(".addTask");
// const liElements = document.getElementsByClassName("taskBox");
// const form = document.querySelector("form");
// const wrapper = document.querySelector(".wrapper");
// let taskNumber = document.querySelector("h1 span");
// const clock = document.createElement("div");
// clock.className = "clock";


const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  let tasks = [...liElements];
  tasks = toDoList.filter((li) =>
    li.textContent.toLowerCase().includes(searchText)
  );
  wrapper.textContent = "";
  tasks.forEach((li) => wrapper.appendChild(li));
};
// const removeNewTask = (e) => {
//   e.target.parentNode.remove();
//   const index = e.target.parentNode.dataset.key;
//   toDoList.splice(index, 1);
//   taskNumber.textContent = liElements.length;
//   // renderList();
// };


// const addTask = (e) => {
//   e.preventDefault();
//   const taskBox = document.createElement("div");
//   taskBox.className = "taskBox";
//   const titleTask = inputAdd.value;
//   // const task = document.createElement("textarea");
//   const task = createTask(titleTask); //new--------------
//   task.className = "task";
//   task.disabled = true;
//   task.type = "text";
//   const deleteBtn = document.createElement("button");
//   deleteBtn.className = "deleteBtn";
//   const editBtn = document.createElement("button");
//   editBtn.className = "editBtn";

//   if (titleTask === "" || titleTask.length <= 3) {
//     alert("Write at least 6 characters!");
//     inputAdd.value = "";
//     return;
//   }

//   deleteBtn.appendChild(document.createTextNode("X"));
//   editBtn.appendChild(document.createTextNode("EDIT"));
//   task.innerHTML = titleTask;
//   toDoList.push(task);
//   taskBox.append(task);
//   taskBox.appendChild(editBtn);
//   taskBox.appendChild(deleteBtn);
//   wrapper.appendChild(taskBox);
//   addBackground();
//   inputAdd.value = "";
//   taskNumber.textContent = liElements.length;
//   taskBox.querySelector(".deleteBtn").addEventListener("click", removeNewTask);
//   taskBox.querySelector(".editBtn").addEventListener("click", () => {
//     task.disabled = !task.disabled;
//   });
// };

// const renderList = () => {
//   wrapper.textContent = "";
//   toDoList.forEach((toDoElement, key) => {
//     toDoElement.dataset.key = key;
//     wrapper.appendChild(toDoElement);
//   });
// };

// //Zmiana kolor t?a dla nieparzystych
// const addBackground = () => {
//   const odd = document.querySelectorAll("wrapper div:nth-child(odd)"); // zamiast div bylo li
//   for (let i = 0; i < odd.length; i++) {
//     odd[i].style.backgroundColor = "#f4f4f4";
//   }
// };

// //Pobieranie date i godzine dodania zadania
// function timeSet() {
//   const time = new Date();
//   const seconds =
//     time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
//   const minutes =
//     time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
//   const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
//   const day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
//   const month =
//     time.getMonth() + 1 < 10 ?
//     "0" + (time.getMonth() + 1) :
//     time.getMonth() + 1;
//   const year =
//     time.getFullYear() < 10 ? "0" + time.getFullYear() : time.getFullYear();
//   clock.innerHTML = `${hours} : ${minutes} : ${seconds} || ${day} - ${month} - ${year} r.`;
//   // document.querySelector('body').appendChild(clock)
// }

inputSearch.addEventListener("input", searchTask);
document
  .querySelector("[data-new-tasks-form]")
  .addEventListener("submit", addTask);

// const removeTask = e => {
//   // e.target.parentNode.remove();
//   // e.target.parentNode.style.textDecoration = "line-through";
//   // e.target.parentNode.style.color = "red";
//   // e.target.remove();

//   const index = e.target.dataset.key;
//   document.querySelector(`li[data-key = "${index}"]`).remove();
// };

// document
//   .querySelectorAll("button[data-key]")
//   .forEach(item => item.addEventListener("click", removeTask));