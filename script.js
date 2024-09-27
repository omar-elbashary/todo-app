// script.js

import { initListeners } from "./scripts/eventListeners.js";
import {
  activeTasks,
  allTasks,
  clearButton,
  completedTasks,
  filterButtons,
  getCheckboxes,
  getDeleteIcons,
  getTaskElements,
  itemsLeft,
  appElement,
  backgroundDark,
  backgroundLight,
  bodyElement,
  darkThemeIcon,
  lightThemeIcon,
  submitButtonElement,
  taskInputElement,
  taskListElement,
  themeToggle,
} from "./scripts/elements.js";

import {
  toggleBackgroundsHandler,
  media,
  toggleDarkMode,
  fetchData,
  toggleTask,
  countItemsLeft,
  saveToDB,
  renderTaskList,
  initDataOnStartup,
} from "./scripts/utils.js";

initListeners();

initDataOnStartup();

countItemsLeft();
