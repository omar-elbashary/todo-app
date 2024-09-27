// elements.js

export const themeToggle = document.querySelector(".theme_toggle");
export const lightThemeIcon = document.querySelector(".light_mood_icon");
export const darkThemeIcon = document.querySelector(".dark_mood_icon");
export const appElement = document.querySelector(".App");
export const taskListElement = document.querySelector(".task_list");
export const submitButtonElement = document.querySelector(".submit_button");
export const taskInputElement = document.querySelector(".task_input");
export const backgroundLight = document.querySelector(".background_light");
export const backgroundDark = document.querySelector(".background_dark");
export const allTasks = document.querySelectorAll(`.filter_item[name="All"]`);
export const activeTasks = document.querySelectorAll(
  `.filter_item[name="Active"]`
);
export const completedTasks = document.querySelectorAll(
  `.filter_item[name="Completed"]`
);
export const clearButton = document.querySelector(".clear_button");
export const filterButtons = document.querySelectorAll(".filter_item");
export const itemsLeft = document.querySelector(".items_left_value");

export const bodyElement = document.body;
export const getTaskElements = () => document.querySelectorAll(".task_div");
export const getDeleteIcons = () =>
  document.querySelectorAll(".task_delete_button");
export const getCheckboxes = () =>
  document.querySelectorAll(".check_box_button");
export const getCheckImages = () => document.querySelectorAll(".check_image");
