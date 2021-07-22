import _ from 'lodash';
import './style.css';

const list = document.getElementById('list');
const input = document.getElementById('input');
const clear = document.querySelector('.clear');
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

// Add task to list
function addToDo(toDo, i, complete, remove) {

  if(remove) {
    return;
  }
  const done = complete ? check : uncheck;
  const line = complete ? line_through : "";
  
  const text = `<li class="task">
                  <div class="taskContent"><i class="fa ${done} complete" job="complete" aria-hidden="true" id="${i}"></i>
                  <p class="text" ${line}>${toDo}</p></div>
                  <i class="fa fa-trash-o delete" job="delete" aria-hidden="true" id="${i}"></i>
                </li>`;
  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
}

//enable "enter" key to add to list
document.addEventListener("keyup", function(event) {
  if(event.keyCode == 13) {
    const toDo = input.value;
    // check if input isn't empty
    if(toDo){
      addToDo(toDo, i, false, false);
      toDoList.push(
        {
          name: toDo,
          i: i,
          complete: false,
          remove: false,
        }
      );
      
      //save list to local storage
      localStorage.setItem("toDo", JSON.stringify(toDoList));
      i++;
      //make input empty
      input.value = "";
    }
  }
});

//store a task
let toDoList = [];
let i = 0;

//task is done
function completeTask(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line_through);
  toDoList[element.i].done = toDoList[element.i].done ? false : true;
}

//remove a task
function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  toDoList[element.i].remove = true;
}

//target items created dynamically
list.addEventListener('click', function(event){
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if(elementJob == "complete") {
    completeTask(element);
  } else if(elementJob == "delete") {
    removeTask(element);
  }

  //save list to local storage
  localStorage.setItem("toDo", JSON.stringify(toDoList));
});

//get  from local storage
let data = localStorage.getItem("toDo");

//check if data is not empty
if(data) {
  toDoList = JSON.parse(data);
  i = toDoList.length;
  loadToDo(toDoList);
} else {
  toDoList = [];
  i = 0;
}
 
//load list
function loadToDo (array) {
  array.forEach(function(item){
    addToDo(item.name, item.i, item.complete, item.remove);
  });
}

//clear local storage
clear.addEventListener('click', function() {
  localStorage.clear();
});

