console.log("Welcome to My todo App");
// The Todo App Code Starts from here 
let todos = [];
let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-task");
let todoInputbar = document.getElementById("todo-input-bar");

todoInputbar.addEventListener("keyup", function toggleSaveButon(){
    let todoText = todoInputbar.value;
    if(todoText.length == 0){
        if(saveButton.classList.contains("disabled")){
            return ;
        }
            saveButton.classList.add("disabled");
       
    }else if(saveButton.classList.contains("disabled"))
        saveButton.classList.remove("disabled");
})

saveButton.addEventListener("click", () =>{
    let todoText = todoInputbar.value;
    if(todoText.length == 0){
        return;
    }
    let todo = {text : todoText, status : 'In Progress', finishedButtonText: 'Finish'};
    todos.push(todo);
    addTodo(todo, todos.length);
    todoInputbar.value ='';
})


function reRenderTodos(){
     todoDataList.innerHTML ='';
    todos.forEach((element, idx)=>{
        addTodo(element, idx+1);
        
    })
} 
// Remove Burton
function removeTodo(event){
   
    let deleteButtonPressed = event.target;
    let indexTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    
    todos.splice(indexTobeRemoved, 1);
   reRenderTodos();
    
}
function finishTodo(event){
    let finishedButtonPressed = event.target;
    let indexTobeFinished = Number(finishedButtonPressed.getAttribute("todo-idx"));

    // Toggling Functionality 
    if(todos[indexTobeFinished].status == "Completed"){
        todos[indexTobeFinished].status = "In Progress";
        todos[indexTobeFinished].finishedButtonText = "Finish";
    }else{
        todos[indexTobeFinished].status = "Completed";
        todos[indexTobeFinished].finishedButtonText = "Undo";
    }
   // todos[indexTobeFinished].status = "Finished";

    // finishedButton.textContent = "Undo"
    // Once finsh this we have to re render the todo list
    // todos[indexTobeFinished].finishedButtonText = 'Undo';

     todos.sort((a,b)=>{
        if(a.status == 'Completed'){
            return 1;
            // a comes after b
        }
        return -1;
        // b comes after a 
     })
    reRenderTodos();

}
function editTodo(event){
    let editButtonPressed = event.target;
    let indexTobeEdited = Number(editButtonPressed.getAttribute("todo-idx")); 
    
}

function addTodo(todo, todoCount){
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions= document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    
    let hiddenInput = document.createElement("input");
    let editButton = document.createElement("button");
    let hr = document.createElement("hr");

    
    // Adding Classes 
    todoItem.classList.add("todo-item" ,"d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail" ,"text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-action","d-flex","justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger","delete-todo");
    finishedButton.classList.add("btn", "btn-success", "finish-todo");
    editButton.classList.add("btn","btn-warning","edit-todo");
    hiddenInput.classList.add("form-control","todo-detail" )
    
    // For Delete button 
    finishedButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.setAttribute("todo-idx", todoCount-1);
    editButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.type = "hidden"

    todoNumber.textContent = `${todoCount}`;
    todoDetail.textContent = todo;// sets the todo text sent from the Input element
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishedButtonText;
    editButton.textContent = 'Edit';
    // Now I need to Append Child 

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton)

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);

    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);
    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);
    
}






























// Reference for Click event 
// let getTodosButton = document.getElementById("get-todos");
// // registration of Event Listener 
// getTodosButton.addEventListener("click", handler);

// let saveTask = document.getElementById("save-task");
// saveTask.onclick = () =>{
//     console.log("Save The Task");
// }
// function handler(){
//     console.log("Clicked Wow")
// }

