function getTodoList(){
    let xmlhttp = new XMLHttpRequest();
    let url = "https://jsonplaceholder.typicode.com/todos";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let todo_list = JSON.parse(this.responseText);
            displayTodo(todo_list);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function displayTodo(todo_list){
        for(i = 0; i < todo_list.length; i++)
            addTodo(todo_list[i].title);
    }
}


// Function to create a todo item block using the input description
function getTodoItem(desc){
    let todo_block = document.createElement('div');
    todo_block.setAttribute('class', 'todo-block');
    todo_block.classList.add('animate-add');
    
    let todo_item = document.createElement('div');
    todo_item.setAttribute('class', 'todo-item');
    
    //Create div with text and edit button
    let todo_div1 = document.createElement('div');
    let todo_desc = document.createElement('p');
    todo_desc.setAttribute('class', 'todo-desc');
    todo_desc.innerHTML = desc;
    edit_button = document.createElement('button');
    edit_button.setAttribute('class', 'todo-button');
    edit_button.setAttribute('onclick', 'editTodo(this)')
    edit_button.innerHTML = 'Edit';
    
    //Create div with input and save button
    let todo_div2 = document.createElement('div');
    todo_div2.style.display = "none";
    let edit_input = document.createElement('input');
    edit_input.setAttribute('class', 'edit-input');
    edit_input.setAttribute('type', 'text');
    let save_button = document.createElement('button');
    save_button.setAttribute('class', 'todo-button');
    save_button.setAttribute('onclick', 'saveTodo(this)');
    save_button.innerHTML = 'Save';
    

    //Create delete button with icon
    delete_button = document.createElement('button');
    delete_button.setAttribute('class', 'delete-button');
    delete_button.setAttribute('onclick', 'deleteTodo(this)')
    delete_icon = document.createElement('img');
    delete_icon.setAttribute('class', 'delete-icon');
    delete_icon.setAttribute('src', 'delete-icon.jpg'); 


    todo_div1.appendChild(todo_desc);
    todo_div1.appendChild(edit_button);
    todo_div2.appendChild(edit_input);
    todo_div2.appendChild(save_button);
    todo_item.appendChild(todo_div1);
    todo_item.appendChild(todo_div2);
    delete_button.appendChild(delete_icon);
    todo_block.appendChild(todo_item);
    todo_block.appendChild(delete_button);

    return todo_block;
}


// Function to add a new todo item to todo list
function addTodo(desc){
    if(desc == "")
        return;
        
    let todo_items_list = document.getElementById("todo-items-list");
    let todo_block = getTodoItem(desc);
    todo_items_list.appendChild(todo_block);
    document.getElementById('todo-input').value = "";
    searchTodo("");
    toggleEmptyTodo();
    setTimeout(()=>todo_block.classList.remove('animate-add'), 500);
}

// Function to delete a todo item from todo list
function deleteTodo(child){
    child.parentElement.remove();
    toggleEmptyTodo();
}


// Function to edit todo item
function editTodo(element){
    let editable = element.parentElement.nextElementSibling;
    editable.childNodes[0].value = element.previousElementSibling.innerHTML;
    editable.style.display = "block";
    element.parentElement.style.display = "none";
}

// Function to save edited todo item
function saveTodo(element){
    let todo_item = element.parentElement.previousElementSibling;
    if(element.previousElementSibling.value != "")
        todo_item.childNodes[0].innerHTML = element.previousElementSibling.value;
    todo_item.style.display = "block";
    element.parentElement.style.display = "none";
}

// Display empty banner when no list items found
function toggleEmptyTodo(){
    if(document.getElementById("todo-items-list").childElementCount == 1){
        document.getElementById("empty-display").style.display = "block";
    }
    else{
        document.getElementById("empty-display").style.display = "none";
    }
}

// Function to search for todo items
function searchTodo(keyword){
    let todo_items_list = document.getElementById('todo-items-list');
    let todo_blocks = todo_items_list.getElementsByClassName('todo-block');
    for(let i = 0; i < todo_blocks.length; i++)
    {
        let todo_item = todo_blocks[i].getElementsByClassName('todo-item')[0];
        let todo_text_item = todo_item.getElementsByTagName("div")[0];
        let todo_text = todo_text_item.getElementsByTagName('p')[0].innerHTML;
        if(todo_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
            todo_blocks[i].style.display = "block";
        }
        else{
            todo_blocks[i].style.display = "none";
        }
    }
}