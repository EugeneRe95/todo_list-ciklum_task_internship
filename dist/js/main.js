const createBtn = document.querySelector('#btn-create');
const cancelBtn = document.querySelector('#btn-cancel');
const saveBtn = document.querySelector('#btn-save');
const modal = document.querySelector('.edit-state');
const title = document.querySelector('#title');
const txArea = document.querySelector('.edit-state-content textarea');
const prioritySel = document.querySelector('.edit-state-content select');
const todosCont = document.querySelector('#todos');
const itemPrior = document.querySelector('#item-priority');
const itemStatus = document.querySelector('#item-status');


class Todo {
    constructor(title, description, priority, status) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}


//Modal window "Create todo"
function showModal() {
    modal.style.display = 'block';
}
function hideModal() {
    modal.style.display = 'none';
}

//Display todos in UI
function getTodo() {
    if (localStorage.getItem('items') != null) {
        let todosItems = JSON.parse(localStorage.getItem('items'));
        todosCont.innerHTML = '';
        todosItems.forEach(todo => {
            const div = document.createElement('div');
            div.classList.add('todo-item');
            if (todo.status == 'open') {
                div.classList.add('open');
            } else {
                div.classList.add('done');
            }
            div.innerHTML = `
        <h3>Title: <span  class="todo-title">${todo.title}</h3>
        <h3>Description: <span  class="todo-description">${todo.description}</h3>
        <h3>Priority: <span  class="todo-priority">${todo.priority}</span></h3>
        <button class="btn-options">...</button>
        <div class="options-container">
        <button class="btn-done">Done</button>
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
        <div>
        `;
            todosCont.appendChild(div);
            if (todo.status == 'done') {
                div.querySelector('.btn-done').innerHTML = 'Open';
            } else {
                div.querySelector('.btn-done').innerHTML = 'Done';
            }
        });
    }
}

//Create Todo
let todos = [];
function addTodo() {
    if (localStorage.getItem('items') === null) {
        let todo = new Todo();
        if (title.value !== '' && txArea.value !== '') {
            todo.title = title.value;
            todo.description = txArea.value;
            todo.priority = prioritySel.value;
            todo.status = 'open';
            todos.push(todo);
            localStorage.setItem('items', JSON.stringify(todos));
            hideModal();
            getTodo();
        } else {
            alert('Please fill in all gaps');
        }
    } else {
        let todosItems = JSON.parse(localStorage.getItem('items'));
        let todo = new Todo();
        if (title.value !== '' && txArea.value !== '') {
            todo.title = title.value;
            todo.description = txArea.value;
            todo.priority = prioritySel.value;
            todo.status = 'open';
            todosItems.push(todo);
            localStorage.setItem('items', JSON.stringify(todosItems));
            hideModal();
            getTodo();
        } else {
            alert('Please fill in all gaps');
        }
    }
}

//Delete todo from UI and localStorage
document.querySelector('#todos').addEventListener('click', (e) => {
    // click delete button
    if (e.target.classList.contains('btn-delete')) {
        e.target.parentElement.parentElement.remove();
        const delTitle = e.target.parentElement.parentElement.querySelector('.todo-title').textContent;
        let todosItems = JSON.parse(localStorage.getItem('items'));
        const newTodos = todosItems.filter(todo => todo.title != delTitle);
        localStorage.setItem('items', JSON.stringify(newTodos));
        if (newTodos.length == 0) localStorage.removeItem('items');
        e.target.parentElement.classList.toggle('show'); 
    } 
    // click show options   
    else if (e.target.classList.contains('btn-options')) {
        e.target.nextElementSibling.classList.toggle('show');
    } 
    //click "done" button
    else if (e.target.classList.contains('btn-done')) {
        let delTitle = e.target.parentElement.parentElement.querySelector('.todo-title').textContent;
        let todosItems = JSON.parse(localStorage.getItem('items'));
        todosItems.forEach(todo => {
            if (todo.title == delTitle) {
                if (todo.status == 'done') {
                    todo.status = 'open';
                    e.target.innerHTML = 'Done';
                } else {
                    todo.status = 'done';
                    e.target.innerHTML = 'Open';
                }
            }
        });
        localStorage.setItem('items', JSON.stringify(todosItems));
        e.target.parentElement.parentElement.classList.toggle('open');
        e.target.parentElement.parentElement.classList.toggle('done');
        e.target.parentElement.classList.toggle('show');
        filterTodos();
    } 
    // click "edit" button
    else if (e.target.classList.contains('btn-edit')) {
        e.target.parentElement.classList.toggle('show');
        showEditable(e);
    }
});

function showEditable(e) {
    const editable = document.querySelector('.editable');
    editable.style.display = 'block';
    const editableCont = document.querySelector('.editable-content');
    const title = e.target.parentElement.parentElement.querySelector('.todo-title').textContent;
    const description = e.target.parentElement.parentElement.querySelector('.todo-description').textContent;
    const priority = e.target.parentElement.parentElement.querySelector('.todo-priority').textContent;
    editableCont.innerHTML = `
    <input id="edit-title" type="text" placeholder="Title" value="${title}">
    <input id="edit-description" type="text" placeholder="Description" value="${description}">
    <select name="">
            <option value="high">high</option>
            <option value="normal">normal</option>
            <option value="low">low</option>
        </select>
    <button class="save-edit">Save</button>
    `;
    let todosItems = JSON.parse(localStorage.getItem('items'));
    editableCont.querySelector('.save-edit').addEventListener('click', () => {
        todosItems.forEach(todo => {
            if (todo.title == title) {
                todo.title == title;
                todo.title = editableCont.querySelector('#edit-title').value;
                todo.description = editableCont.querySelector('#edit-description').value;
                todo.priority = editableCont.querySelector('select').value;
            }
        });
        localStorage.setItem('items', JSON.stringify(todosItems));
        getTodo();
        editable.style.display = 'none';
        filterTodos();
    });
}

// Filter Todos

function filterTodos() {
    const todos = document.querySelectorAll('.todo-item');
    const selectedPr = itemPrior.options[itemPrior.selectedIndex].value;
    const selectedSt = itemStatus.options[itemStatus.selectedIndex].value;
    const search = document.querySelector('#search');
    todos.forEach(todo => {
        if (todo.querySelector('.todo-title').textContent.toUpperCase().indexOf(search.value.toUpperCase()) > -1 && todo.querySelector('.todo-priority').textContent.indexOf(selectedPr) > -1 && todo.classList.contains(`${selectedSt}`)) {
            todo.style.display = '';
        } else if(todo.querySelector('.todo-title').textContent.toUpperCase().indexOf(search.value.toUpperCase()) > -1 && selectedPr=='all' && todo.classList.contains(`${selectedSt}`)){
            todo.style.display = '';
        }else if(todo.querySelector('.todo-title').textContent.toUpperCase().indexOf(search.value.toUpperCase()) > -1 && selectedPr=='all' && selectedSt=='all'){
            todo.style.display = '';
        }else if(todo.querySelector('.todo-title').textContent.toUpperCase().indexOf(search.value.toUpperCase()) > -1 && todo.querySelector('.todo-priority').textContent.indexOf(selectedPr) > -1 && selectedSt=='all'){
            todo.style.display = '';
        }else {
            todo.style.display = 'none';
        }
    });
}

//Event Listeners
createBtn.addEventListener('click', showModal);
cancelBtn.addEventListener('click', hideModal);
saveBtn.addEventListener('click', addTodo);
window.addEventListener('DOMContentLoaded', getTodo);
itemPrior.addEventListener('change', filterTodos);
itemStatus.addEventListener('change', filterTodos);
window.addEventListener('DOMContentLoaded', filterTodos);
search.addEventListener('keyup', filterTodos);