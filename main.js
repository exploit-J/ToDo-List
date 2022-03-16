let userInput = document.querySelector('.task-input')
let addButton = document.querySelector('.add-button')
let taskList = []
let tabs = document.querySelectorAll('.task-nav')
let mode = 'tab-all'
let filterList = []
let underLine = document.querySelector('.underline')

addButton.addEventListener('click', addTask)
// userInput.addEventListener('keypress', function(e){
//   if(e.key === 'Enter'){
//     addTask()
//   }
// })
// for(let i=0; i<tabs.length; i++){
//   tabs[i].addEventListener('click', function(e){filter(e)})
// }

function addTask(){
  if(userInput == ''){
    alert('할일을 적어주세요')
  }
    let task = {
    id : randomIDGenerator(),
    taskContent : userInput.value,
    isComplete : false
  }
  taskList.push(task)
  userInput.value = ''
  filter()
}

function render(){
  let result = ''
  let list = []

  if(mode == 'tab-all'){
    list = taskList
  } else {
    list = filterList
  }

  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete == true){
      result += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">check</button>
        <button onclick="deleteTask('${list[i].id}')">delete</button>
      </div>
    </div>`
    } else{
      result += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
      <button onclick="toggleComplete('${list[i].id}')">check</button>
      <button onclick="deleteTask('${list[i].id}')">delete</button>
      </div>
      </div>`
    }
  }
  document.querySelector('.task-board').innerHTML = result
}

function toggleComplete(toggleId){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == toggleId){
      taskList[i].isComplete = !taskList[i].isComplete
      break
    }
  }
  filter()
}

function deleteTask(dtoggleId){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == dtoggleId){
      taskList.splice(i, 1)
      break
    }
  }
  filter()
}

function filter(e){
  if(e){
    mode = e.target.id
    underLine.style.width = e.target.offsetWidth + 'px'
    underLine.style.left = e.target.offsetLeft + 'px'
    underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + 'px'
  }
  
  filterList = []
  if(mode == 'tab-all'){
    render()
  }else if(mode == 'tab-not-done'){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == false){
        filterList.push(taskList[i])
      }
    }
    render()
  }else if(mode == 'tab-done'){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i])
      }
    }
    render()
  }
}

function randomIDGenerator() {
  return "_" + Math.random().toString(36).substring(2, 11);
}