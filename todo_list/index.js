const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('list-container');

todoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const contentInput = document.getElementById('content');
  const selectedCategory = document.querySelector('input[name="category"]:checked');

  if (contentInput.value.trim() === '') {
    alert('Please enter a task!');
    return; // Exit the function if no task is entered
  }

  // Create a new todo item element
  const todoItem = document.createElement('li');
  todoItem.classList.add(selectedCategory.value); 

  // Create the text element for the task content
  const todoText = document.createElement('span');
  todoText.textContent = contentInput.value;
  todoItem.appendChild(todoText);

  // Create the edit button
  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.textContent = 'Edit';
  todoItem.appendChild(editButton);

  // Create the delete button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'Delete';
  todoItem.appendChild(deleteButton);

  // Clear the content input for next entry
  contentInput.value = '';

  // Append the todo item to the list
  todoList.appendChild(todoItem);

  // Functionality for Edit button:
  editButton.addEventListener('click', function() {
    // 1. Toggle edit mode for the todo item
    todoItem.classList.toggle('editing');

    // 2. Handle editing based on edit mode
    if (todoItem.classList.contains('editing')) {
      // Editing mode: Replace text span with an input field
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = todoText.textContent; 
      todoItem.replaceChild(editInput, todoText);

      // Add a save button
      const saveButton = document.createElement('button');
      saveButton.classList.add('save');
      saveButton.textContent = 'Save';
      todoItem.appendChild(saveButton);

      // Functionality for Save button :
      saveButton.addEventListener('click', function() {
        // Update the task content with the new input value
        todoText.textContent = editInput.value;
        todoItem.replaceChild(todoText, editInput);
        todoItem.removeChild(saveButton); // Remove save button
        todoItem.classList.remove('editing'); // Exit editing mode
      });
    } else {
      // Not in editing mode: Remove any edit input or save button
      const editInput = todoItem.querySelector('input');
      if (editInput) {
        todoItem.replaceChild(todoText, editInput);
      }
      const saveButton = todoItem.querySelector('.save');
      if (saveButton) {
        todoItem.removeChild(saveButton);
      }
    }
  });

  // Functionality for Delete button (remains the same):
  deleteButton.addEventListener('click', function() {
    todoList.removeChild(todoItem);
  });
});
