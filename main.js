const taskInputFieldSelector = document.querySelector(".add-task-input")
const taskListSelector = document.querySelector(".todo-list")
const controlSectionSelector = document.querySelector(".todo-list-control")
const checkBtnSelector = document.querySelector(".check-all-btn")
const taskQuantitySelector = document.querySelector(".task-quantity")
const doneListSelector = document.querySelector(".done-list")
const activeListSelector = document.querySelector(".active-list")
const doneBtnSelector = document.querySelector(".btn-complete")
const activeBtnSelector = document.querySelector(".btn-active")
const allBtnSelector = document.querySelector(".btn-all")
const tasksSeletor = document.querySelectorAll('.todo-content')

let tasks = []

window.addEventListener('load', () => {
  try {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  } catch {
    tasks = []
  }

  if(tasks.length > 0 ){
    let num = 0
    tasks.forEach(task => {
      render(task)
      if (task.status) {
        num++
      }
    })
    if (num > 0) {
      document.querySelector('.btn-delete-all').style.visibility = 'visible'
    }
  }
  let id = 0
  taskInputFieldSelector.addEventListener("keypress", function (e) {
    let task = {}
    const addTask = taskInputFieldSelector.value.trim()
    if( e.key === "Enter"){
      if(addTask === ""){
        alert("Please fill the placehold")
      }
      for( let i = 0; i < tasks.length ; i++){
        if(tasks[i].content === addTask){
          alert("Please do not enter the same task")
          return
        } 
      }
      task.content = addTask
      task.status = false
      task.id = id
      tasks.push(task)
      id ++
      render(task)
      localStorage.setItem("tasks", JSON.stringify(tasks))
      
    }
  })

  activeBtnSelector.addEventListener('click', function () {
    if(!activeBtnSelector.classList.contains("active")){
      doneBtnSelector.classList.remove("active")
      activeBtnSelector.classList.add("active")
      allBtnSelector.classList.remove("active")
    }
    displayActive()
  })

  doneBtnSelector.addEventListener('click', function () {
    if (!doneBtnSelector.classList.contains("active")) {
      doneBtnSelector.classList.add("active")
      activeBtnSelector.classList.remove("active")
      allBtnSelector.classList.remove("active")
    }
    displayDone()
  })

  allBtnSelector.addEventListener('click', function (){
    if (!allBtnSelector.classList.contains("active")) {
      doneBtnSelector.classList.remove("active")
      activeBtnSelector.classList.remove("active")
      allBtnSelector.classList.add("active")
    }
    displayAll()
  })

  // document.querySelector('.btn-delete-all').addEventListener('click',function () {
  //   deleteDone
  // })

  checkBtnSelector.addEventListener('click', function () {
    let num = 0
    taskListSelector.innerHTML = ''
    tasks = JSON.parse(localStorage.getItem("tasks"))
    document.querySelector('.btn-delete-all').style.visibility = "visible"
    tasks.forEach( task => { 
      if (task.status) {
        num ++
      }
    })
    if (num === tasks.length) {
      for (let  i = 0; i<tasks.length; i++) {
        tasks[i].status = false
      }
      localStorage.setItem("tasks", JSON.stringify(tasks))
      document.querySelector('.btn-delete-all').style.visibility = "hidden"
    }
    else {
      for(let  i = 0; i < tasks.length; i++){
        tasks[i].status = true
      }
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach( task => {
      render(task)
    })
  })
})

function render(task) {
  checkBtnSelector.style.visibility = "visible"
  
  const task_el = document.createElement('li')
  task_el.setAttribute("data-id", `${task.id}`)
  task_el.classList.add('todo-content')
  taskListSelector.appendChild(task_el)

  const task_checkbox = document.createElement("input")
  task_checkbox.classList.add("check-task")
  task_checkbox.type = 'checkbox'
  task_checkbox.checked = task.status
  task_el.appendChild(task_checkbox)

  const task_text = document.createElement("input")
  task_text.type = 'text'
  task_text.value = `${task.content}`
  task_text.setAttribute('readonly', 'readonly')
  task_el.appendChild(task_text)

  const task_btn = document.createElement("div")
  task_btn.classList.add("delete-task-btn")
  task_el.appendChild(task_btn)

  const delete_icon = document.createElement("i")
  delete_icon.classList.add("fa-solid")
  delete_icon.classList.add("fa-xmark")
  task_btn.appendChild(delete_icon)

  taskInputFieldSelector.value = ""
  taskQuantitySelector.innerText = `${tasks.length} tasks left`

  task_text.addEventListener('dblclick', function () {
    this.removeAttribute('readonly')
    let idEL = this.parentElement.getAttribute('data-id')
    this.addEventListener('blur', function () {
      let newText = task_text.value;
      for (let i = 0; i < tasks.length; i++ ) {
        if (tasks[i].id === parseInt(idEL)) {
          tasks[i].content = newText
          localStorage.setItem("tasks", JSON.stringify(tasks))
        }
      }
    })
  })
  
  task_btn.addEventListener('click', function () {
    let idEl = this.parentElement.getAttribute('data-id')
    for (let i = 0; i < tasks.length; i++) {
      let index = tasks.findIndex( function (o){ 
        return o.id === parseInt(idEl)
      })
      if (index !== -1) tasks.splice(index, 1);
    }
    taskQuantitySelector.innerText = `${tasks.length} tasks left`
    localStorage.setItem("tasks", JSON.stringify(tasks))
    taskListSelector.removeChild(task_el)
    if(tasks.length === 0){
      checkBtnSelector.style.visibility = "hidden"
      controlSectionSelector.style.visibility = 'hidden'
      return
    }
    tasks = JSON.parse(localStorage.getItem("tasks"))
    let num = 0
    for(let i = 0; i<tasks.length; i++){
      if(tasks[i].status){
        num++
      }
    }
    if(num === 0 ){
      document.querySelector('.btn-delete-all').style.visibility = "hidden"
    }
  })

  task_checkbox.addEventListener('click', function () {
    let idEl = this.parentElement.getAttribute('data-id')
    let index = -1
    let numDoneTask = 0
    for (let i = 0; i < tasks.length; i++) {
       index = tasks.findIndex(function (o) {
        return o.id === parseInt(idEl)
      })
    }
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach(task => {
      if (task.status == true) {
        numDoneTask ++
      }
    })
    if (numDoneTask > 0) {
      document.querySelector(".btn-delete-all").style.visibility = "visible"
      return
    }
    document.querySelector(".btn-delete-all").style.visibility = "hidden"
    
  })
  
  checkBtnSelector.style.visibility = "visible"
  controlSectionSelector.style.visibility = 'visible'
  
  document.querySelector('.btn-delete-all').addEventListener('click', function () {
    deleteDone()
    document.querySelector('.btn-delete-all').style.visibility = "hidden"
  })

}

function displayActive () {
  taskListSelector.innerHTML = ""
  tasks = JSON.parse(localStorage.getItem("tasks"))
  tasks.forEach(task => {
    if(task.status === false){
      render(task)
      document.querySelector(".btn-delete-all").style.visibility = "hidden"
    }
  })
}

function displayDone () {
  taskListSelector.innerHTML = ""
  tasks = JSON.parse(localStorage.getItem("tasks"))
  tasks.forEach(task => {
    if (task.status) {
      render(task)
      document.querySelector(".btn-delete-all").style.visibility = "visible"
    }
  })
}

function displayAll () {
  taskListSelector.innerHTML = ""
  tasks = JSON.parse(localStorage.getItem("tasks"))
  tasks.forEach( task => {
    render(task)
    if (task.status) {
      document.querySelector(".btn-delete-all").style.visibility = "visible"
    }
  })
}

function deleteDone () {
  let tasks1 = tasks.filter(function(task){
    if (task.status === false) {
      return task
    }
  })
  tasks = tasks1;
  localStorage.setItem("tasks", JSON.stringify(tasks))
  taskListSelector.innerHTML = ""
  tasks.forEach( task => {
    render(task)
  })
  doneBtnSelector.classList.remove("active")
  activeBtnSelector.classList.remove("active")
  allBtnSelector.classList.add("active")
  if (tasks.length === 0) {
    controlSectionSelector.style.visibility = "hidden"
  }
} 

