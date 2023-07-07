const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update local storage with the tasks array
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks in the task list
function displayTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function(task, index) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', function() {
      listItem.classList.toggle('completed');
      task.completed = checkbox.checked;
      updateLocalStorage();
    });

    const label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(task.name));

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', function() {
      const updatedTask = prompt('Enter the updated task:', task.name);

      if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index].name = updatedTask.trim();
        updateLocalStorage();
        displayTasks();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      updateLocalStorage();
      displayTasks();
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(label);
    listItem.appendChild(buttonsContainer);
    taskList.appendChild(listItem);
  });
}

// Event listener for the 'click' event on the add task button
addTaskBtn.addEventListener('click', function() {
  const taskName = taskInput.value.trim(); // Get the entered task

  if (taskName !== '') {
    const task = {
      name: taskName,
      completed: false
    };
    tasks.push(task); // Add the task to the tasks array
    updateLocalStorage(); // Update local storage
    displayTasks(); // Display the tasks
    taskInput.value = ''; // Clear the input field
  }
});

// Retrieve tasks from local storage and display them on page load
window.addEventListener('load', function() {
  displayTasks();
});

taskList.style.backgroundColor = '#CCFFFF'; // Add mark off tasks

// CSS styles for the 'completed' class
const style = document.createElement('style');
style.textContent = `
  .completed label {
    text-decoration: line-through;
  }
  .buttons-container {
    display: flex;
    gap: 5px;
  }
`;
document.head.appendChild(style);
