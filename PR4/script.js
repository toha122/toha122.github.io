
document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

addBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText, false);
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = '';
    }
});

function addTaskToDOM(taskText, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.classList.add('completed');
            saveTaskToLocalStorage(taskText, true);
        } else {
            li.classList.remove('completed');
            saveTaskToLocalStorage(taskText, false);
        }
    });

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Видалити це завдання?')) {
            li.remove();
            removeTaskFromLocalStorage(taskText);
        }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
    } else {
        tasks.push({ text: taskText, completed: completed });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
