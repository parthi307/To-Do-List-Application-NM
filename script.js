let todos = [];
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const statsText = document.getElementById('statsText');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    todoInput.value = '';
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
}

function getFilteredTodos() {
    if (currentFilter === 'active') {
        return todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        return todos.filter(t => t.completed);
    }
    return todos;
}

function renderTodos() {
    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No tasks to show</div>';
    } else {
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="checkbox" onclick="toggleTodo(${todo.id})"></div>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </li>
        `).join('');
    }

    updateStats();
}

function updateStats() {
    const activeTodos = todos.filter(t => !t.completed).length;
    const plural = activeTodos !== 1 ? 's' : '';
    statsText.textContent = ${activeTodos} task${plural} remaining;
}

// Event Listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initial Render
renderTodos();