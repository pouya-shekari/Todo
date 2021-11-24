/*const data = {
    title:'pouya',
    description:'pouya',
    createdAt: `${new Date().toLocaleDateString()}`,
    updateAt:`${new Date().toLocaleDateString()}`,
    checked:false,
    dueDate: `${new Date().toLocaleDateString()}`,
    id: "1",
}*/

(async() => {
    const url = `https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos`;
    const response = await fetch(url)
    todos = (await response.json())
    renderTodos(todos)
})()

const todoForm = document.querySelector('.todo-form');
const todoItemsList = document.querySelector('.todo-items');
const todoInput = document.querySelector('.todo-input');
const todoDescription = document.getElementById('exampleFormControlTextarea1')
const todosForm = document.getElementById('todos-form')
const pagination = document.getElementsByClassName('pagination')[0]

todoForm.addEventListener('submit', function(event) {
    const el2 = document.getElementById('submit')
    el2.textContent = 'Add'
    event.preventDefault();
    addTodo(todoInput.value,todoDescription.value);
});

function onFocus(e){
    const el = document.getElementById('exampleFormControlInput1')
    if(e.target.value.trim() !== ''){
        el.classList.remove('invalid');
    } else{
        el.classList.add('invalid')
        const errorEl = document.getElementById("error-input");
        errorEl.innerHTML='the input is invalid!'
    }
}
function onBlur(e){

    const el = document.getElementById('exampleFormControlInput1')
    if(e.target.value.trim() !== ''){
        el.classList.remove('invalid');
        const errorEl = document.getElementById("error-input");
        errorEl.innerHTML=''
    } else{
        el.classList.add('invalid')
        const errorEl = document.getElementById("error-input");
        errorEl.innerHTML='the input is invalid!'
    }

}

function addTodo(item,descript) {
    console.log(descript)
    if (item.trim() !== '') {
        let data = {
            title:item,
            description:descript,
            createdAt: `${new Date().toLocaleDateString()}`,
            updateAt:`${new Date().toLocaleDateString()}`,
            checked:false,
            dueDate: `${new Date().toLocaleDateString()}`,
            id: "1",
        }
        //post
            fetch("https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos" ,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })

        myFunction()
        todoInput.value = '';
        todoDescription.value = '';
        const errorEl = document.getElementById("error-input");
        errorEl.innerHTML=''

    }
}

function renderTodos() {
    let counter = Math.floor(todos.length / 10) + 1
    let count = 0
    let list = todos
    console.log(list.reverse())
    for(let i=0 ; i<counter ; i++){
        let el = document.createElement('ul')
        let pl = document.createElement('li')
        el.classList.add('list-group')
        el.classList.add('list-group-horizontal')
        el.classList.add('rounded-0')
        el.classList.add('d-none')
        el.classList.add('itemPages')
        el.classList.add(`itemPage${i+1}`)
        pl.classList.add('page-item')
        pl.setAttribute('pageNumber',i+1)
        todosForm.appendChild(el)
        pagination.appendChild(pl)
        let link = `#page${i+1}`
        pl.innerHTML = `
            <a class="page-link" href="${link}" onclick="page(event)">${i+1}</a>
        `
        el.innerHTML = ''
        for(let j = 0+count ; j<10+count ; j++){
            const checkedItem = todos[j].checked ? 'checked': null;
            let li = document.createElement('li');
            li.setAttribute('class', 'item');
            li.setAttribute('data-key', todos[j].id);
            if (todos[j].checked == true) {
                li.classList.add('checked');
            }
            li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checkedItem} onclick="togle(event)">
      ${todos[j].title}
      <button class="delete-button" onclick="deleteTodoItem(event)"><svg id="del" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg></button>
      <button class="edit-button" onclick="editTodoItem(event)"><svg id="edit" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg></button>
    `;
            el.appendChild(li);
        }
        count+=10
        let newEl = document.getElementsByClassName(`itemPage${1}`)[0]
        newEl.classList.replace('d-none','d-block')
    }
}

function page(e){
    let num = Number(e.target.parentElement.getAttribute('pageNumber'))
    for(let i=0 ; i<num ; i++){
        let pages = document.getElementsByClassName('itemPages')[i]
        pages.classList.replace('d-block','d-none')
    }
    let el = document.getElementsByClassName(`itemPage${num}`)[0]
    el.classList.replace('d-none','d-block')
    //console.log(el)
    //el.style.display = 'block'
}

function togle(e){
    toggle(Number(e.target.parentElement.getAttribute('data-key')))
}

function deleteTodoItem(e){
    document.getElementById('id01').style.display='block'
    let el = document.getElementsByClassName('deletebtn')[0]
    el.addEventListener('click',function(){
        document.getElementById('id01').style.display='none'
        deleteTodo(e.target.parentElement.parentElement.parentElement.getAttribute('data-key'))
    })
}

function editTodoItem(e){

    //
    //editTodo(e.target.parentElement.parentElement.getAttribute('data-key'))
    localStorage.setItem('counter','1')
    localStorage.setItem('globalId',e.target.parentElement.parentElement.getAttribute('data-key'))
    localStorage.setItem('todoItems',JSON.stringify(todos))
    window.location.href = `./index.html`
    //editTodo()
}

function deleteTodo(id) {
    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}` ,{
        method:'DELETE',
    })
}


function myFunction() {
    // Get the snackbar DIV
    let toast = document.getElementById("snackbar");

    // Add the "show" class to DIV
    toast.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

function toggle(id) {
    todos.forEach(item=>{
        if(item.id==id){
            let data = {
                title:item.title,
                description:item.description,
                createdAt: item.createdAt,
                updateAt:item.updateAt,
                checked:true,
                dueDate: item.dueDate,
                id: "1",
            }
            fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}` ,{
                method:'PUT',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            })
        }
    })
    /*
    */
}


if((localStorage.getItem('counter')) == 1){
    let globalId = Number(localStorage.getItem('globalId'))
    //console.log(globalId)
    let counter = localStorage.getItem('counter')
    //console.log(counter)
    localStorage.setItem('counter','0')

    let todoIte = JSON.parse(localStorage.getItem('todoItems'))
    const el = document.querySelector('.todo-input');
    const el1 = document.getElementById('exampleFormControlTextarea1')
    const el2 = document.getElementById('submit')

    todoIte.forEach(item=>{
        if(item.id == globalId){
            el.value = item.title
            el1.value = item.description
            el2.textContent = 'save'
            deleteTodo(globalId)
        }
    })
}