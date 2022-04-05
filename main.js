let tasks = []

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
window.addEventListener('load', () => {
  tasks = JSON.parse(localStorage.getItem("tasks"))
  if(tasks.length > 0 ){
    tasks.forEach(task => {
      render(tasks,task)
    })
  }

  taskInputFieldSelector.addEventListener('keypress', function (e) {
      let taskContent
      // tasks = JSON.parse(localStorage.getItem("tasks"))
      if (e.key === 'Enter') {
          taskContent = taskInputFieldSelector.value;
          //Check xem user đã điền vào text field chưa
          if(taskContent == '') {
              alert("Please enter the field")
              return
          }
          for( let i = 0; i < tasks.length ; i++){
            if(tasks[i] === taskContent){
              alert("Please do not enter the same task")
              return
            }
          }
          tasks.push(taskContent)
          localStorage.setItem("tasks", JSON.stringify(tasks))
          render(tasks,taskContent)
      }   
  })
  //Click to show active task
  activeBtnSelector.addEventListener('click', function(){
      activeListSelector.innerHTML = ''
      checkBtnSelector.style.visibility = "hidden"

      if(!activeBtnSelector.classList.contains("active")){
          activeBtnSelector.classList.add("active")
          doneBtnSelector.classList.remove("active")
          allBtnSelector.classList.remove("active")
          displayActiveTasks()
      }
  })
  //Click to show done tasks
  doneBtnSelector.addEventListener('click', function(){
      doneListSelector.innerHTML = ''
      checkBtnSelector.style.visibility = "hidden"

      if(!doneBtnSelector.classList.contains("active")){
          doneBtnSelector.classList.add("active")
          activeBtnSelector.classList.remove("active")
          allBtnSelector.classList.remove("active")
          displayDoneTasks()
      }
  })
  //Click to show all tasks
  allBtnSelector.addEventListener("click", function (){
      if(!allBtnSelector.classList.contains("active")){
          allBtnSelector.classList.add("active")
          doneBtnSelector.classList.remove("active")
          activeBtnSelector.classList.remove("active")
          displayAllTasks()
      }
  })
})

function displayDoneTasks(){
  const allTasksSelector = document.querySelectorAll(".todo-content")
  
  doneListSelector.style.display = 'block'
  activeListSelector.style.display = 'none'
  taskListSelector.style.display = 'none'
  allTasksSelector.forEach((task, index) => {
      if(task.children[0].checked){
          doneListSelector.innerHTML += `
          <li class="done-content">
              <input type="checkbox" class="check-task" checked>
              <input type="text" value="${task.children[1].value}" readonly>
              <div class="delete-task-btn">
                  <i class="fa-solid fa-xmark"></i>
              </div>
          </li>`

      }
  })
}

function displayActiveTasks(){
  const allTasksSelector = document.querySelectorAll(".todo-content")

  doneListSelector.style.display = 'none'
  activeListSelector.style.display = 'block'
  taskListSelector.style.display = 'none'
  allTasksSelector.forEach((task,index) => {
      if(!task.children[0].checked){
          activeListSelector.innerHTML += `
          <li class="active-content ">
              <input type="checkbox" class="check-task">
              <input type="text" value="${task.children[1].value}" readonly>
              <div class="delete-task-btn">
                  <i class="fa-solid fa-xmark"></i>
              </div>
          </li>`

      }
  })
}

function displayAllTasks(){
  doneListSelector.style.display = 'none'
  activeListSelector.style.display = 'none'
  taskListSelector.style.display = 'block'
}

function render(tasks,taskContent){ 
  checkBtnSelector.style.visibility = "visible"
  
  const task_el = document.createElement('li')
  task_el.classList.add('todo-content')
  taskListSelector.appendChild(task_el)

  const task_checkbox = document.createElement("input")
  task_checkbox.classList.add("check-task")
  task_checkbox.type = 'checkbox'
  task_el.appendChild(task_checkbox)

  const task_text = document.createElement("input")
  task_text.type = 'text'
  task_text.value = `${taskContent}`
  task_text.setAttribute('readonly', 'readonly')
  task_el.appendChild(task_text)

  const task_btn = document.createElement("div")
  task_btn.classList.add("delete-task-btn")
  task_el.appendChild(task_btn)

  const delete_icon = document.createElement("i")
  delete_icon.classList.add("fa-solid")
  delete_icon.classList.add("fa-xmark")
  task_btn.appendChild(delete_icon)

  taskInputFieldSelector.value = ''

  //Remove element
  task_btn.addEventListener('click', function(){
      taskListSelector.removeChild(task_el);
      tasks.remove(task_el.children[1].value)
      localStorage.setItem("tasks", JSON.stringify(tasks))   
      taskQuantitySelector.innerText = `${tasks.length} tasks left`
      if(tasks.length == 0){
        checkBtnSelector.style.visibility = "hidden"
        controlSectionSelector.style.visibility = 'hidden'
        return
      }
  })
  //Visible button check all
  checkBtnSelector.style.visibility = "visible"
  controlSectionSelector.style.visibility = 'visible'
  //Display the number of tasks
  taskQuantitySelector.innerText = `${tasks.length} tasks left`
  //Click button to select all the items
  checkBtnSelector.addEventListener('click', function(){
      if(task_checkbox.checked){
          task_checkbox.checked = false
          document.querySelector(".btn-delete-all").style.visibility = "hidden"
          return
      }
      task_checkbox.checked = true
      document.querySelector(".btn-delete-all").style.visibility = "visible"
      document.querySelector(".btn-delete-all").addEventListener('click', function(){
        tasks = []
        localStorage.setItem("tasks", JSON.stringify(tasks))
        taskListSelector.innerHTML = ''
        checkBtnSelector.style.visibility = "hidden"
        controlSectionSelector.style.visibility = 'hidden'
        document.querySelector(".btn-delete-all").style.visibility = "hidden"
        location.reload()
      })
  })
}

Array.prototype.remove = function() {
  let what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};