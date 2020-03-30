// const inputSearch = document.querySelector(".search");
// const inputAdd = document.querySelector(".addTask");
// const ul = document.querySelector("ul");
// const liElements = document.getElementsByClassName("task");
// const form = document.querySelector("form");
// let taskNumber = document.querySelector("h1 span");

// const searchTask = e => {
//   const searchText = e.target.value.toLowerCase();
//   let tasks = [...liElements];
//   tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchText));
//   ul.textContent = "";
//   tasks.forEach(li => ul.appendChild(li));
// };
// const removeNewTask = e => {
//   e.target.parentNode.remove();
//   taskNumber.textContent = liElements.length;
// };

// const addTask = e => {
//   e.preventDefault();
//   const titleTask = inputAdd.value;
//   if (titleTask === "" || titleTask.length <= 5) {
//     alert("Wpisz minimum 6 znakow!");
//     inputAdd.value = "";
//     return;
//   }
//   const task = document.createElement("li");
//   task.className = "task";
//   task.innerHTML = titleTask + "<button>Usun</button>";
//   ul.appendChild(task);
//   inputAdd.value = "";
//   taskNumber.textContent = liElements.length;
//   task.querySelector("button").addEventListener("click", removeNewTask);
// };

// inputSearch.addEventListener("input", searchTask);
// form.addEventListener("submit", addTask);

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

// const arr = [33, 54, 12, 123, 4553, 5693, 355, 554, 1, 90, 1233242];
// const letter = ["add", "adaad", "asdadad", "asdadad"];
// const oddNumbers = arr.filter(number => number % 2);
// const evenNumbers = arr.filter(number => !(number % 2));
// const numBigThen200 = arr.filter(number => number > 200);
// const numBig = letter.filter(number => number.toUpperCase());

// const double = arr.map(number => number * 2);

// //forEach

// arr.forEach((number, index) => (arr[index] = number * 2));

//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------

let toDoList = [];
const inputSearch = document.querySelector(".search");
const inputAdd = document.querySelector(".addTask");
// const ol = document.querySelector("ol");
const liElements = document.getElementsByClassName("taskBox");
const form = document.querySelector("form");
let taskNumber = document.querySelector("h1 span");
const wrapper = document.querySelector(".wrapper");

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
  renderList();
};

const addTask = e => {
  e.preventDefault();
  const titleTask = inputAdd.value;
  // const task = document.createElement("li");// ODZNACZYC ABY WROCIC DO PIERWOTNEJ WERSJI
  const taskBox = document.createElement("div"); //
  let task = document.createElement("input"); //
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const time = timeSet();

  if (titleTask === "" || titleTask.length <= 3) {
    alert("Wpisz minimum 6 znakow!");
    inputAdd.value = "";
    return;
  }
  //---------------------------

  task.className = "task";
  task.disabled = true; //
  task.type = "text"; //

  //-----------------------------
  deleteBtn.className = "deleteBtn";
  editBtn.className = "editBtn";
  taskBox.className = "taskBox"; //

  deleteBtn.appendChild(document.createTextNode("X"));
  editBtn.appendChild(document.createTextNode("EDIT"));
  task.innerHTML = titleTask;
  toDoList.push(task);
  renderList();
  addBackground();
  // task.appendChild(deleteBtn);
  // task.appendChild(editBtn);
  // ol.appendChild(task);
  taskBox.appendChild(task); //
  taskBox.appendChild(deleteBtn); //
  taskBox.appendChild(editBtn); //
  wrapper.appendChild(taskBox); //
  inputAdd.value = "";
  taskNumber.textContent = liElements.length;
  taskBox.querySelector(".deleteBtn").addEventListener("click", removeNewTask);
  taskBox.querySelector(".editBtn").addEventListener("click", () => {
    task.disabled = !task.disabled;
  }); //
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
const timeSet = () => {
  const data = document.createElement("div");
  const time = new Date();
  const seconds =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  const minutes =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  const day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  const month =
    time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  const year =
    time.getFullYear() < 10 ? "0" + time.getFullYear() : time.getFullYear();
  data.innerHTML = `${hours} : ${minutes} : ${seconds} || ${day} - ${month} - ${year} r.`;
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
