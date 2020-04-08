const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
let toDoList = [];
const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector('[data-delete-list-button]')

const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')

const inputSearch = document.querySelector(".search");
const inputAdd = document.querySelector(".addTask");
const liElements = document.getElementsByClassName("taskBox");
const form = document.querySelector("form");
const wrapper = document.querySelector(".wrapper");
let taskNumber = document.querySelector("h1 span");
const clock = document.createElement("div");
clock.className = "clock";

//Selecting which ID we selected
listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender()
  }
})
//Deleted active/selected list
deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null;
  saveAndRender()
})

newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender()
});

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  };
}
//Only functions call
function saveAndRender() {
  save()
  render()
}
//Function which save lists to loacalstorage
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)) //saving lists
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId) //saving selected list ID
}

function render() {
  clearElement(listsContainer);
  renderLists()

  const selectedList = lists.find(list => list.id === selectedListId)
  //if list is activ hide or show tasks list
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none'
  } else {
    listDisplayContainer.style.display = ''
    listTitleElement.textContent = selectedList.name;
  }
}

function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list')
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

// const abc = () => {
//   clock.className = 'clock'
//   document.querySelector('body').appendChild(clock)
//   timeSet()
// }
// abc()

const searchTask = e => {
  const searchText = e.target.value.toLowerCase();
  let tasks = [...liElements];
  tasks = toDoList.filter(li =>
    li.textContent.toLowerCase().includes(searchText)
  );
  wrapper.textContent = "";
  tasks.forEach(li => wrapper.appendChild(li));
};
const removeNewTask = e => {
  e.target.parentNode.remove();
  const index = e.target.parentNode.dataset.key;
  toDoList.splice(index, 1);
  taskNumber.textContent = liElements.length;
  // renderList();
};

const addTask = e => {
  e.preventDefault();
  const taskBox = document.createElement("div");
  taskBox.className = "taskBox";
  const titleTask = inputAdd.value;
  const task = document.createElement("textarea");
  task.className = "task";
  task.disabled = true;
  task.type = "text";
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";

  if (titleTask === "" || titleTask.length <= 3) {
    alert("Write at least 6 characters!");
    inputAdd.value = "";
    return;
  }

  deleteBtn.appendChild(document.createTextNode("X"));
  editBtn.appendChild(document.createTextNode("EDIT"));
  task.innerHTML = titleTask;
  toDoList.push(task);
  taskBox.appendChild(task);
  taskBox.appendChild(editBtn);
  taskBox.appendChild(deleteBtn);
  wrapper.appendChild(taskBox);
  addBackground();
  inputAdd.value = "";
  taskNumber.textContent = liElements.length;
  taskBox.querySelector(".deleteBtn").addEventListener("click", removeNewTask);
  taskBox.querySelector(".editBtn").addEventListener("click", () => {
    task.disabled = !task.disabled;
  });
};

const renderList = () => {
  wrapper.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    wrapper.appendChild(toDoElement);
  });
};

//Zmiana kolor t?a dla nieparzystych
const addBackground = () => {
  const odd = document.querySelectorAll("div:nth-child(odd)"); // zamiast div bylo li
  for (let i = 0; i < odd.length; i++) {
    odd[i].style.backgroundColor = "#f4f4f4";
  }
};

//Pobieranie date i godzine dodania zadania
function timeSet() {
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
  clock.innerHTML = `${hours} : ${minutes} : ${seconds} || ${day} - ${month} - ${year} r.`;
  // document.querySelector('body').appendChild(clock)
}

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