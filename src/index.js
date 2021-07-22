
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
                  <i class="fa ${done} complete" job="complete" aria-hidden="true" id="${i}"></i>
                  <p class="text" ${line}>${toDo}</p>
                  <i class="fa fa-trash-o delete" job="delete" aria-hidden="true" id="${i}"></i>
                </li>`;
  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
}
