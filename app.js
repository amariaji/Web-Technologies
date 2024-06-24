// Select the form and list elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Function to add a new task
function addTask(event) {
    event.preventDefault(); // Prevent form submission

    // Get the value of the input field
    const taskText = todoInput.value;

    // Create a new list item
    const listItem = document.createElement('li');

    // Add the task text to the list item
    listItem.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the list item to the list
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = '';

    // Add event listener to the delete button
    deleteButton.addEventListener('click', deleteTask);
}

// Function to delete a task
function deleteTask(event) {
    const listItem = event.target.parentElement;
    todoList.removeChild(listItem);
}

// Add event listener to the form
todoForm.addEventListener('submit', addTask);
