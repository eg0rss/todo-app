const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

// Получаем данные из localStorage, если они есть
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// Функция для отображения задач в списке
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}><input type = "text" id="tsk${index}" class="taskInput" value ="${task.text}"  readonly><button class="editBtn">Изменить</button><button class="deleteBtn">Удалить</button>`;       
         taskList.appendChild(li);
    });
}

// Добавление новой задачи
addTaskBtn.addEventListener('click', () => {
    const newTask = {
        text: taskInput.value,
        completed: false
    };
    tasks.push(newTask);
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
});

// Удаление задачи
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        tasks.splice(event.target.parentElement.querySelector('input').id.slice(4), 1);
        displayTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

// Изменение статуса задачи
taskList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        tasks[event.target.id.slice(4)].completed = event.target.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
// Редактирование задачи
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('editBtn')) {
        const taskId = event.target.parentElement.querySelector('input').id.slice(4);
        document.getElementById(`tsk${taskId}`).removeAttribute("readonly");
        const button = document.createElement('button');
        button.innerText='Сохранить';
        button.className="saveBtn";

        button.addEventListener('click', (event)=>{
        const newText = document.getElementById(`tsk${taskId}`).value;
        if (newText) {
            tasks[taskId].text = newText;
            displayTasks();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        });
        taskList.appendChild(button);
    }
});
// Очистка списка задач
clearBtn.addEventListener('click', () => {
    tasks = [];
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Инициализация отображения задач
displayTasks();