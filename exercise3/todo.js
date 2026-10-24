const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const status = document.getElementById("status");

const STORAGE_KEY = "webLabTasks";

let tasks = loadTasks();

renderTasks();

form.addEventListener("submit", function (event) {
  // Prevent the form from reloading the page.
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    status.textContent = "Please enter a task.";
    return;
  }

  tasks.push(text);
  saveTasks();
  renderTasks();

  input.value = "";
  input.focus();
});

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return [];
    }

    const parsed = JSON.parse(saved);

    // Only accept an array containing strings.
    if (
      Array.isArray(parsed) &&
      parsed.every(function (task) {
        return typeof task === "string";
      })
    ) {
      return parsed;
    }

    status.textContent = "Saved tasks have an invalid format.";
    return [];
  } catch (error) {
    status.textContent = "Could not load saved tasks.";
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    status.textContent = "";
  } catch (error) {
    status.textContent =
      "Tasks could not be saved. Browser storage may be unavailable.";
  }
}

function renderTasks() {
  list.replaceChildren();

  tasks.forEach(function (task, index) {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    text.textContent = task;

    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete task: " + task);

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    item.append(text, " ", deleteButton);
    list.appendChild(item);
  });
}