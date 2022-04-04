let tasks = 0

const taskInputFieldSelector = document.querySelector(".add-task-input")
const todoListSelector = document.querySelector(".todo-list")
const controlSectionSelector = document.querySelector(".todo-list-control")
const checkBtnSelector = document.querySelector(".check-all-btn")
const taskQuantitySelector = document.querySelector(".task-quantity")

taskInputFieldSelector.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const taskContent = taskInputFieldSelector.value;
      //Check xem user đã điền vào text field chưa
      if(taskContent == '') {
          alert("Please enter the field")
          return
      }
    //Add content của task vào array phục vụ cho việc xóa về sau
    tasks += 1
    renderTask(taskContent)
    //Visible tab control phía dưới cùng giao diện
    controlSectionSelector.style.visibility = "visible";
    
    deleteTask()
    
    }
})

function renderTask(task) { 
    //Render task mới khi user nhập thêm
    todoListSelector.innerHTML += `
        <li class="todo-content">
            <input type="checkbox" class="check-task">
            <input type="text" value="${task}" readonly>
            <div class="delete-task-btn">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </li>
    `
    //Reset text field
    taskInputFieldSelector.value = ''

    //Visible button check all
    checkBtnSelector.style.visibility = "visible"

    //Display the number of tasks
    taskQuantitySelector.innerText = `${tasks} tasks left`

    
}

//Remove task

function deleteTask() {
    const deleteBtnsSelector = document.querySelectorAll('.delete-task-btn')
    deleteBtnsSelector.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', function (){
            deleteBtn.parentElement.outerHTML = ""    
            tasks -= 1 
            if(tasks === 0){
                controlSectionSelector.style.visibility = "hidden";
                checkBtnSelector.style.visibility = "hidden"
            }
            //Display the number of tasks
            taskQuantitySelector.innerText = `${tasks} tasks left`
            
        })
    })
}

