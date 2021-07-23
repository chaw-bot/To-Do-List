// import _ from 'lodash';
import './style.css';

const list = document.getElementById('list');
const input = document.getElementById('input');
const clear = document.querySelector('.clear');
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const lineThrough = 'line-through';

// Add task to list
function addToDo(toDo, i, complete, remove) {
  if (remove) {
    return;
  }
  const done = complete ? check : uncheck;
  const line = complete ? lineThrough : '';
  const text = `<li class="task">
                  <div class="taskContent">
                    <i class="fa ${done} complete" job="complete" aria-hidden="true" id="${i}"></i>
                    <p class="text" ${line} >${toDo}</p>
                  </div>
                  <i class="fa fa-ellipsis-v" aria-hidden="true" id="${i}"></i>
                </li>`;
                // <i class="fa fa-trash-o delete" job="delete" aria-hidden="true" id="${i}"></i>
  const position = 'beforeend';

  list.insertAdjacentHTML(position, text);
}

// store a task
let toDoList = [];
let i = 0;

// enable "enter" key to add to list
document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const toDo = input.value;
    // check if input isn't empty
    if (toDo) {
      addToDo(toDo, i, false, false);
      toDoList.push(
        {
          name: toDo,
          /* eslint-disable */
          i: i,
          /* eslint-enable */
          complete: false,
          remove: false,
        },
      );

      // save list to local storage
      localStorage.setItem('toDo', JSON.stringify(toDoList));
      /* eslint-disable */
      i++;
      /* eslint-enable */
      // make input empty
      input.value = '';
    }
  }
});

// task is done
function completeTask(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);
  /* eslint-disable */
  toDoList[element.i].done = toDoList[element.i].done ? false : true;
  /* eslint-enable */
}

// remove a task
function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  toDoList[element.i].remove = true;
}

// target items created dynamically
list.addEventListener('click', (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'complete') {
    completeTask(element);
  } else if (elementJob === 'delete') {
    removeTask(element);
  }

  // save list to local storage
  localStorage.setItem('toDo', JSON.stringify(toDoList));
});

// get  from local storage
const data = localStorage.getItem('toDo');

// load list
function loadToDo(array) {
  array.forEach((item) => {
    addToDo(item.name, item.i, item.complete, item.remove);
  });
}

// check if data is not empty
if (data) {
  toDoList = JSON.parse(data);
  i = toDoList.length;
  loadToDo(toDoList);
} else {
  toDoList = [];
  i = 0;
}

// clear local storage
clear.addEventListener('click', () => {
  localStorage.clear();
  /* eslint-disable */
  location.reload();
  /* eslint-enable */
});
