// Called onpageload. Sets the loading gif and initiate data fetch.
function loadTodo(){
    let loader = document.createElement('div');
    loader.setAttribute('id', 'loading');
    let todo_list = document.getElementById('todo-items-list');
    //Displays loading gif
    todo_list.appendChild(loader);

    //Initiate data fetch
    setTimeout(getTodoList, 1500);
    //Check whether items list is empty or not
    setTimeout(toggleEmptyTodo, 2000);
}

// Funciton to fetch data from 
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

    //Adds todo list block for every element in todo list
    function displayTodo(todo_list){
        for(i = 0; i < todo_list.length; i++)
            addTodo(todo_list[i].title, todo_list[i].completed);
    }

    //Removes the loading gif after data is fetched
    let todo_list = document.getElementById('todo-items-list');
    let loader = document.getElementById('loading');
    todo_list.removeChild(loader);
}


// Function to create a todo item block using the input description
function getTodoItem(desc, isCompleted){
    let todo_block = document.createElement('div');
    todo_block.setAttribute('class', 'todo-block');
    todo_block.classList.add('animate-add');
    
    let todo_item = document.createElement('div');
    todo_item.setAttribute('class', 'todo-item');
    
    //Create a custom checkbox
    var checkbox = document.createElement('label');
    checkbox.setAttribute('class', 'completed');
    var checkbox_input = document.createElement('input')
    checkbox_input.setAttribute('type', 'checkbox');
    var checkmark = document.createElement('span');
    checkmark.setAttribute('class', 'checkmark');
    if(isCompleted)
        checkbox_input.setAttribute('checked', 'checked');
    checkbox.appendChild(checkbox_input);
    checkbox.appendChild(checkmark);

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
    delete_icon.setAttribute('src', 'images/delete-icon.jpg'); 

    //Create dom tree with items hierarchy
    todo_div1.appendChild(todo_desc);
    todo_div1.appendChild(edit_button);
    todo_div2.appendChild(edit_input);
    todo_div2.appendChild(save_button);
    todo_item.appendChild(checkbox);
    todo_item.appendChild(todo_div1);
    todo_item.appendChild(todo_div2);
    delete_button.appendChild(delete_icon);
    todo_block.appendChild(todo_item);
    todo_block.appendChild(delete_button);

    return todo_block;
}


// Function to add a new todo item to todo list
function addTodo(desc, isCompleted = false){
    if(desc == "")
        return;
    
    //Create todo block and fill it.
    let todo_items_list = document.getElementById("todo-items-list");
    let todo_block = getTodoItem(desc, isCompleted);
    todo_items_list.appendChild(todo_block);

    //Remove typed text from search box
    document.getElementById('todo-input').value = "";
    //Replace todo items to display all items(since currently list has only searched keyword items)
    searchTodo("");

    //Remove "No todo items to show" banner after element is added.
    toggleEmptyTodo();
    //Remove animation from todo-block to stop it from animation when searched.
    //(Animation should only work on add)
    setTimeout(()=>todo_block.classList.remove('animate-add'), 500);
}


// Function to delete a todo item from todo list
function deleteTodo(child){
    child.parentElement.remove();
    //Check for "No todo items to show" banner after deletion of items
    toggleEmptyTodo();
}


// Function to edit todo item
function editTodo(element){
    let editable = element.parentElement.nextElementSibling;
    //Get the text from todo-desc and copy it to input text box value
    editable.childNodes[0].value = element.previousElementSibling.innerHTML;
    //Display the input text box.
    editable.style.display = "block";
    //Hide the todo desc text.
    element.parentElement.style.display = "none";
}

// Function to save edited todo item
function saveTodo(element){
    let todo_item = element.parentElement.previousElementSibling;
    //Restricts from saving todo item value as empty. Copies input box value to todo desc inner text
    if(element.previousElementSibling.value != "")
        todo_item.childNodes[0].innerHTML = element.previousElementSibling.value;
    //Display the todo desc text
    todo_item.style.display = "block";
    //Hide the input text box
    element.parentElement.style.display = "none";
}

// Display empty banner when no list items found
function toggleEmptyTodo(){
    //childElements will be 1 when empty since there is a "No todo items to show" banner by default.
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
    //Traverse all todo blocks
    for(let i = 0; i < todo_blocks.length; i++)
    {
        let todo_item = todo_blocks[i].getElementsByClassName('todo-item')[0];
        let todo_text_item = todo_item.getElementsByTagName("div")[0];
        let todo_text = todo_text_item.getElementsByTagName('p')[0].innerHTML;
        //Display todo blocks when match
        if(todo_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
            todo_blocks[i].style.display = "block";
        }
        //Hide todo blocks when not matched
        else{
            todo_blocks[i].style.display = "none";
        }
    }
}