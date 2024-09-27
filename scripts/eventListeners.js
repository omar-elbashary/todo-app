// eventListeners.js

import {
  activeTasks,
  allTasks,
  clearButton,
  completedTasks,
  filterButtons,
  getCheckboxes,
  getDeleteIcons,
  getTaskElements,
  submitButtonElement,
  themeToggle,
} from "./elements.js";
import {
  addTask,
  clearCompleted,
  deleteTask,
  fetchData,
  filterActive,
  filterAll,
  filterCompleted,
  media,
  renderTaskList,
  saveToDB,
  toggleBackgroundsHandler,
  toggleDarkMode,
  toggleTask,
} from "./utils.js";

export const initListeners = () => {
  themeToggle.addEventListener("click", () => {
    toggleDarkMode();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const active = document.querySelector(".active");
      if (active) active.classList.remove("active");
      button.classList.add("active");
    });
  });

  clearButton.addEventListener("click", () => {
    clearCompleted();
  });

  allTasks.forEach((button) => {
    button.addEventListener("click", () => {
      filterAll();
    });
  });

  submitButtonElement.addEventListener("click", (e) => {
    addTask(e);
  });

  activeTasks.forEach((button) => {
    button.addEventListener("click", () => filterActive());
  });

  completedTasks.forEach((button) => {
    button.addEventListener("click", () => filterCompleted());
  });

  media.addEventListener("change", toggleBackgroundsHandler());
};

export const initTaskListeners = () => {
  getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deleteTask(e, index));
  });

  getCheckboxes().forEach((box, index) => {
    box.addEventListener("click", (e) => {
      toggleTask(e, index);
    });

    box.addEventListener("keydown", (e) => {});
  });
};

export const initTaskDragListeners = () => {
  const taskListItems = getTaskElements();

  taskListItems.forEach((item, index) => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
      item.classList.add("dragging");
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    item.addEventListener("drop", (e) => {
      e.preventDefault();
      const tasks = fetchData("tasks");
      const draggedIndex = e.dataTransfer.getData("text/plain");
      const draggedItem = tasks[draggedIndex];
      tasks.splice(draggedIndex, 1);
      tasks.splice(index, 0, draggedItem);
      saveToDB("tasks", tasks);
      renderTaskList(tasks);
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
  });
};
