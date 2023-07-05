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
    listItem.textContent = task;
    listItem.classList.add('task-item');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', function() {
      const updatedTask = prompt('Enter the updated task:', task);

      if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index] = updatedTask.trim();
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

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('buttons-wrapper');
    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(deleteButton);

    listItem.appendChild(buttonsWrapper);
    taskList.appendChild(listItem);
  });
}

// Event listener for the 'click' event on the add task button
addTaskBtn.addEventListener('click', function() {
  const task = taskInput.value.trim(); // Get the entered task

  if (task !== '') {
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

taskList.style.backgroundColor = '#CCFFFF';