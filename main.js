let tasks = 0

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

    taskInputFieldSelector.addEventListener('keypress', function (e) {
        let taskContent
        if (e.key === 'Enter') {
            taskContent = taskInputFieldSelector.value;
            //Check xem user đã điền vào text field chưa
            if(taskContent == '') {
                alert("Please enter the field")
                return
            }

            tasks ++
                        
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
                tasks --   
                taskQuantitySelector.innerText = `${tasks} tasks left`
                if(tasks == 0){
                checkBtnSelector.style.visibility = "hidden"
                controlSectionSelector.style.visibility = 'hidden'
                    return
                }
            })
            //Click button to select all the items
            checkBtnSelector.addEventListener('click', function deleteAll(){
                if(task_checkbox.checked){
                    task_checkbox.checked = false
                    document.querySelector(".btn-delete-all").style.visibility = "hidden"
                    return
                }
                task_checkbox.checked = true
                document.querySelector(".btn-delete-all").style.visibility = "visible"
                document.querySelector(".btn-delete-all").addEventListener('click', function(){
                    tasks = 0
                    taskListSelector.innerHTML = ''
                    checkBtnSelector.style.visibility = "hidden"
                    controlSectionSelector.style.visibility = 'hidden'
                    document.querySelector(".btn-delete-all").style.visibility = "hidden"
                })
            })

            //    Visible button check all
            checkBtnSelector.style.visibility = "visible"
            controlSectionSelector.style.visibility = 'visible'
            //Display the number of tasks
            taskQuantitySelector.innerText = `${tasks} tasks left`
 
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
    doneListSelector.style.display = 'block'
    activeListSelector.style.display = 'none'
    taskListSelector.style.display = 'none'

    const allTasksSelector = document.querySelectorAll(".todo-content")
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
            activeTasks.unshift(task)
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
