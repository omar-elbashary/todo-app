// utils.js

import {
  initListeners,
  initTaskDragListeners,
  initTaskListeners,
} from "./eventListeners.js";
import {
  appElement,
  bodyElement,
  darkThemeIcon,
  itemsLeft,
  lightThemeIcon,
  taskInputElement,
  taskListElement,
} from "./elements.js";

export const media = window.matchMedia("(max-width:559px)");

export const renderTaskList = (tasks) => {
  let taskList = "";
  tasks.forEach((task) => {
    taskList += `
        <li class="task_div${
          task.isCompleted ? " is--active" : ""
        }" draggable="true">
                    <button class="check_box_button" >
                      <img class="check_image" src="./images/icon-check.svg" alt="" />
                    </button>
                    <div class="task_content">
                      <p class="task_value">${task.value}</p>
                      <img
                        class="task_delete_button"
                        src="./images/icon-cross.svg"
                        alt=""
                      />
                    </div>
                  </li>
        `;
  });
  taskListElement.innerHTML = taskList;

  taskInputElement.value = "";

  initTaskListeners();
  initTaskDragListeners();
};

export const toggleIconHandler = () => {
  lightThemeIcon.classList.toggle("theme_inactive");
  darkThemeIcon.classList.toggle("theme_inactive");
};

export const toggleAppHandler = () => {
  appElement.classList.toggle("dark-theme");
  bodyElement.classList.toggle("dark-theme");
  saveToDB("darkModeFlag", appElement.classList.contains("dark-theme"));
};

export const toggleBackgroundsHandler = () => {
  const isDarkMode = bodyElement.classList.contains("dark-theme");

  if (media.matches) {
    bodyElement.style.backgroundImage = isDarkMode
      ? "url('./images/bg-mobile-dark.jpg')"
      : "url('./images/bg-mobile-light.jpg')";
  } else {
    bodyElement.style.backgroundImage = isDarkMode
      ? "url('./images/bg-desktop-dark.jpg')"
      : "url('./images/bg-desktop-light.jpg')";
  }
};

export const toggleDarkMode = () => {
  toggleAppHandler();
  toggleIconHandler();
  toggleBackgroundsHandler();
};

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

export const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const toggleTask = (e, index) => {
  const tasks = fetchData("tasks");

  e.currentTarget.parentElement.classList.toggle("is--active");
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB("tasks", tasks);
  countItemsLeft();
};

export const countItemsLeft = () => {
  const tasks = fetchData("tasks");
  const tasksFilterd = tasks.filter((task) => !task.isCompleted);
  itemsLeft.innerHTML = tasksFilterd.length;
};

export const filterAll = () => {
  const tasks = fetchData("tasks");
  renderTaskList(tasks);
};

export const deleteTask = (e, index) => {
  const answer = confirm("are you sure?");
  if (answer === false) return;

  const tasks = fetchData("tasks");
  tasks.splice(index, 1);
  saveToDB("tasks", tasks);
  renderTaskList(tasks);
  countItemsLeft();
};

export const addTask = (e) => {
  e.preventDefault();
  const taskValue = taskInputElement.value;

  if (!taskValue) return;

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData("tasks") || [];

  tasks.push(task);

  saveToDB("tasks", tasks);

  renderTaskList(tasks);
  countItemsLeft();
};

export const filterActive = () => {
  const tasks = fetchData("tasks");
  const tasksFilterd = tasks.filter((task) => !task.isCompleted);
  renderTaskList(tasksFilterd);
};

export const clearCompleted = () => {
  const tasks = fetchData("tasks");
  const tasksFilterd = tasks.filter((task) => !task.isCompleted);
  saveToDB("tasks", tasksFilterd);
  renderTaskList(tasksFilterd);
};

export const filterCompleted = () => {
  const tasks = fetchData("tasks");
  const tasksFilterd = tasks.filter((task) => task.isCompleted);
  renderTaskList(tasksFilterd);
};

export const initDataOnStartup = (tasks) => {
  fetchData("darkModeFlag") && toggleDarkMode();
  renderTaskList(fetchData("tasks"));
};
