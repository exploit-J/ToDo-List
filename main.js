let userInput = document.querySelector('.task-input')
let addButton = document.querySelector('.add-button')
let taskList = []
let tabs = document.querySelectorAll('.task-nav')
let mode = 'tab-all'
let filterList = []
let underLine = document.querySelector('.underline')

addButton.addEventListener('click', addTask)
userInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    addTask()
  }
})
for(let i=0; i<tabs.length; i++){
  tabs[i].addEventListener('click', function(e){filter(e)})
}

// 할일 리스트 추가
function addTask(){
  // 입력창이 공란이면 경고알림
  if(userInput.value == ''){
    // 경고알림 종료 후 자동 input focus
    swal('오늘 할 일을 적어주세요').then(function(){userInput.focus()})
    return
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

// 할일 리스트 생성 함수
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

// 할일 리스트 체크, 체크해제
function toggleComplete(toggleId){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == toggleId){
      taskList[i].isComplete = !taskList[i].isComplete
      break
    }
  }
  filter()
}

// 할일 리스트 삭제
function deleteTask(toggleId){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == toggleId){
      taskList.splice(i, 1)
      break
    }
  }
  filter()
}


function filter(e){
  if(e){
    mode = e.target.id
    // 탭 메뉴 클릭 시 underline effect
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

// 랜덤 ID 생성
function randomIDGenerator() {
  return "_" + Math.random().toString(36).substring(2, 11);
}