let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        updateTaskList();
    }
}

function updateTaskList() {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "task-list__item";
        listItem.innerHTML = `
            <div class="task-item">
                <div class="task-item__main">
                    <input type="checkbox" class="task-item__checkbox" ${task.completed ? "checked" : ""}>
                    <p class="task-item__text" style="${task.completed ? "text-decoration: line-through;" : ""}">${task.text}</p>
                </div>
                <div class="task-item__icons">
                    <img src="./images/bin.png" class="task-item__delete" alt="Delete" style="cursor:pointer;" />
                </div>
            </div>
        `;

        // Toggle complete
        listItem.querySelector(".task-item__checkbox").addEventListener("change", () => {
            tasks[index].completed = !tasks[index].completed;
            updateTaskList();
        });

        // Delete task
        listItem.querySelector(".task-item__delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTaskList();
        });

        taskList.appendChild(listItem);
    });

    // Update progress bar and circle
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const progressBarFill = document.getElementById("progress");
    const progressNumber = document.getElementById("numbers");

    if (progressBarFill) {
        progressBarFill.style.width = `${percentage}%`;
    }

    if (progressNumber) {
        progressNumber.textContent = `${completed} / ${total}`;
    }
}

document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});
