(() => {

const newTodoFormEl = document.querySelector(".form");
const taskDescriptionEl = document.querySelector("#description");
const taskDeadlineEl = document.querySelector("#deadline");
const taskPriorityEl = document.querySelector("#priority");
const sortOrderEl = document.querySelector("#sort");
const filterCriteriaEl = document.querySelector("#filter");
let tasks = [];
let filteredTasks = [];

window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  newTodoFormEl.addEventListener("submit", addTask);
  filteredTasks = [...tasks];
  displayTasks(tasks);
});

priorityLevels = {
  1: "High",
  2: "Medium",
  3: "Low",
};

// Render tasks
function displayTasks(tasksToRender) {
  const tasksList = document.querySelector(".tasks");
  tasksList.innerHTML = "";

  console.log(tasksToRender);

  tasksToRender.forEach((task) => {
    

    const taskItem = document.createElement("div");
    taskItem.classList.add("task", task.complete ? "complete" : "uncomplete", priorityLevels[task.priority]);
    taskItem.setAttribute("id", task.createdAt);
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    const description = document.createElement("h3");
    description.classList.add("task-title");
    description.textContent = task.description;
    const deadline = document.createElement("p");
    deadline.classList.add("task-deadline");
    deadline.textContent = `Deadline: ${task.deadline}`;
    const priority = document.createElement("p");
    priority.classList.add("task-priority");
    priority.textContent = priorityLevels[task.priority] + " Priority";
    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "edit-task-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editTask);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "delete-task-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTask);
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("btn", "complete-task-btn");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", completeTask);

    taskInfo.append(description, deadline, priority);
    taskActions.append(editBtn, deleteBtn, completeBtn);
    taskItem.append(taskInfo, taskActions);
    tasksList.appendChild(taskItem);
  });
}

// --Handlers--

// Add a task
function addTask(e) {
  e.preventDefault();
  const currentTaskDescription = taskDescriptionEl.value;
  const currentTaskDeadline = taskDeadlineEl.value;
  const currentTaskPriority = taskPriorityEl.value;

  if (Date.now() > Date.parse(currentTaskDeadline)) {
    alert("Deadline must be in the future");
    return;
  }

  const task = {
    description: currentTaskDescription,
    complete: false,
    deadline: currentTaskDeadline,
    priority: currentTaskPriority,
    createdAt: Date.now(),
  };
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  filterTasks();
  e.target.reset();
  sortOrderEl.value = "none";
}

// Edit task
// display edit form
function displayEditTask(e, saveTask) {
  const task = e.target.parentElement.parentElement;
  const currentTaskDescription = task.firstChild.children[0].innerText;
  const currentTaskDeadline =
    task.firstChild.children[1].innerText.split(" ")[1];
  const currentTaskPriority =
    task.firstChild.children[2].innerText.split(" ")[0];

  task.firstChild.innerHTML = "";
  task.lastChild.innerHTML = "";

  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("id", "description");
  descriptionInput.setAttribute("required", "true");
  descriptionInput.setAttribute("maxlength", "40");
  descriptionInput.value = currentTaskDescription;

  const deadlineInput = document.createElement("input");
  deadlineInput.setAttribute("type", "date");
  deadlineInput.setAttribute("id", "deadline");
  deadlineInput.setAttribute("required", "");
  deadlineInput.value = currentTaskDeadline;

  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("id", "priority");
  const optionHigh = document.createElement("option");
  optionHigh.textContent = "High";
  optionHigh.setAttribute("value", 1);
  const optionMedium = document.createElement("option");
  optionMedium.textContent = "Medium";
  optionMedium.setAttribute("value", 2);
  const optionLow = document.createElement("option");
  optionLow.textContent = "Low";
  optionLow.setAttribute("value", 3);

  if (currentTaskPriority === "High") optionHigh.setAttribute("selected", true);
  else if (currentTaskPriority === "Medium")
    optionMedium.setAttribute("selected", true);
  else if (currentTaskPriority === "Low")
    optionLow.setAttribute("selected", true);

  priorityInput.append(optionHigh, optionMedium, optionLow);

  const currnetTaskForm = document.createElement("form");
  const currentTaskButton = document.createElement("button");
  currentTaskButton.setAttribute("type", "submit");
  currentTaskButton.textContent = "Save";
  currentTaskButton.classList.add("btn");
  currentTaskButton.addEventListener("click", saveTask);

  currnetTaskForm.append(
    descriptionInput,
    deadlineInput,
    priorityInput,
    currentTaskButton
  );
  task.firstChild.appendChild(currnetTaskForm);
}
// save edited task
function editTask(e) {
  const currentTaskId = e.target.parentElement.parentElement.id;

  displayEditTask(e, saveTask);

  function saveTask(e) {
    
    const task = e.target.parentElement;
    console.log(task.children[2].value);
    
    const currentTaskDescription = task.firstChild.value;
    const currentTaskDeadline =
      task.children[1].value;
    const currentTaskPriority =
      task.children[2].value;

    e.preventDefault();
    tasks.forEach((task) => {
      if (task.createdAt === Number(currentTaskId)) {
        if (Date.now() > Date.parse(currentTaskDeadline)) {
          alert("Deadline must be in the future");
        } else {
          task.description = currentTaskDescription;
          task.deadline = currentTaskDeadline;
          task.priority = currentTaskPriority;
        }
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    filterTasks();
  }


}

// Delete task
function deleteTask(e) {
  const currentTaskId = e.currentTarget.parentElement.parentElement.id;
  tasks = tasks.filter((task) => task.createdAt != currentTaskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  filterTasks();
}

// Complete task
function completeTask(e) {
  const currentTaskId = e.currentTarget.parentElement.parentElement.id;
  tasks.forEach((task) => {
    if (task.createdAt === Number(currentTaskId)) {
      task.complete = !task.complete;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  filterTasks();
}

// Sorting tasks
const sortTasks = () => {
  const sortOrder = sortOrderEl.value;

  switch (sortOrder) {
    case "alphabetically":
      filteredTasks.sort((a, b) => {
        if (a.description.toLowerCase() < b.description.toLowerCase())
          return -1;
        if (a.description.toLowerCase() > b.description.toLowerCase()) return 1;
        return 0;
      });
    case "deadlineClose":
      filteredTasks.sort((a, b) => {
        if (Date.parse(a.deadline) < Date.parse(b.deadline)) return -1;
        if (Date.parse(a.deadline) > Date.parse(b.deadline)) return 1;
        return 0;
      });
      break;
    case "deadlineFurter":
      filteredTasks.sort((a, b) => {
        if (Date.parse(b.deadline) < Date.parse(a.deadline)) return -1;
        if (Date.parse(b.deadline) > Date.parse(a.deadline)) return 1;
        return 0;
      });
      break;

    case "priorityHigh":
      filteredTasks.sort((a, b) => {
        if (Date.parse(a.priority) < Date.parse(b.priority)) return -1;
        if (Date.parse(a.priority) > Date.parse(b.priority)) return 1;
        return 0;
      });
      break;
    case "priorityLow":
      filteredTasks.sort((a, b) => {
        if (Date.parse(b.priority) < Date.parse(a.priority)) return -1;
        if (Date.parse(b.priority) > Date.parse(a.priority)) return 1;
        return 0;
      });
      break;

    default:
      break;
  }
  displayTasks(filteredTasks);
};
sortOrderEl.addEventListener("change", sortTasks);

// Filter tasks
const filterTasks = (e) => {
  const filterCriteria = filterCriteriaEl.value;
  filteredTasks = [...tasks];

  switch (filterCriteria) {
    case "completed":
      filteredTasks = filteredTasks.filter((task) => task.complete === true);
      break;
    case "notCompleted":
      filteredTasks = filteredTasks.filter((task) => task.complete === false);
      break;
    case "highPriority":
      filteredTasks = filteredTasks.filter((task) => task.priority === "1");
      break;
    case "mediumPriority":
      filteredTasks = filteredTasks.filter((task) => task.priority === "2");
      break;
    case "lowPriority":
      filteredTasks = filteredTasks.filter((task) => task.priority === "3");
      break;
    default:
      break;
  }
  displayTasks(filteredTasks);
};

filterCriteriaEl.addEventListener("change", filterTasks);

})();