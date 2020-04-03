let toDoList = [];
const inputSearch = document.querySelector(".search");
const inputAdd = document.querySelector(".addTask");
const liElements = document.getElementsByClassName("taskBox");
const form = document.querySelector("form");
const wrapper = document.querySelector(".wrapper");
let taskNumber = document.querySelector("h1 span");
const clock = document.createElement('div')
clock.className = 'clock'
const taskBox = document.createElement("div");
taskBox.className = "taskBox";

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
    alert("Wpisz minimum 6 znakow!");
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
  // taskBox.appendChild(clock);
  // timeSet()
  wrapper.appendChild(taskBox);
  addBackground();
  inputAdd.value = "";
  taskNumber.textContent = liElements.length;
  taskBox.querySelector(".deleteBtn").addEventListener("click", removeNewTask);
  taskBox.querySelector(".editBtn").addEventListener("click", () => {
    task.disabled = !task.disabled;
    toDoList.push(task);

  });
};

const renderList = () => {
  wrapper.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    wrapper.appendChild(toDoElement);
  });
};

//Zmieniamy kolor t?a dla nieparzystych
const addBackground = () => {
  const odd = document.querySelectorAll("div:nth-child(odd)"); // zamiast div bylo li
  for (let i = 0; i < odd.length; i++) {
    odd[i].style.backgroundColor = "#f4f4f4";
  }
};

//Pobieramy date i godzine dodania zadania
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
};

inputSearch.addEventListener("input", searchTask);
form.addEventListener("submit", addTask);

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