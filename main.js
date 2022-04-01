let tasks = []

let taskInputField = document.querySelector(".add-task-input")
let main = document.querySelector(".main-section")
let controlSection = document.querySelector(".todo-list-control")
let checkBtn = document.querySelector(".check-all-btn")

taskInputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      let taskContent = taskInputField.value;
      //Check xem user đã điền vào text field chưa
      if(taskContent == '') {
          alert("Please enter the field")
          return
      }
    //Add content của task vào array phục vụ cho việc xóa về sau
    tasks.unshift(taskContent)
    renderTask(taskContent)
    //Visible tab control phía dưới cùng giao diện
    controlSection.style.visibility = "visible";
    
    }
})

function renderTask(task) { 
    //Render task mới khi user nhập thêm
    main.innerHTML += `
    <ul class="todo-list">
        <li class="todo-content">
            <input type="checkbox" class="check-task">
            <input type="text" value="${task}" readonly>
            <div class="delete-task-btn">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </li>
    </ul>
    `
    //Reset text field
    taskInputField.value = ''
    //Visible button check all
    checkBtn.style.visibility = "visible"
}