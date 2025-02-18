let tasks = [];

function startGame() {
  document.getElementById('start-button').style.display = 'none';
  showStage(1, '');
}

function showStage(stageNumber, message) {
  const stages = document.querySelectorAll('.stage');
  stages.forEach(stage => stage.style.display = 'none');

  const currentStage = document.getElementById(`stage-${stageNumber}`);
  currentStage.style.display = 'block';

  if (message) {
    const clueElement = document.createElement('p');
    clueElement.innerText = message;
    currentStage.appendChild(clueElement);
  }

  if (stageNumber === 4) {
    displayTaskList();
  }
}

function addTask(task, nextStage) {
  const taskObj = {
    description: task,
    date: '',
  };
  tasks.push(taskObj);
  showStage(nextStage, '');
}

function displayTaskList() {
  const taskListDiv = document.getElementById('task-list');
  taskListDiv.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
      <p>${task.description}</p>
      <input type="date" onchange="updateTaskDate(${index}, this.value)" value="${task.date}">
    `;
    taskListDiv.appendChild(taskDiv);
  });
}

function updateTaskDate(index, date) {
  tasks[index].date = date;
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTaskList();
  }
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
