
let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskinput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });

        updateTaskList();
        taskInput.value = ''; 
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" onclick="editTask(${index})" />
                    <img src="bin.png" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;

        taskList.append(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskinput'); 
    taskInput.value = tasks[index].text; 

    tasks.splice(index, 1); 
    updateTaskList();
    updateStats();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress'); 

    progressBar.style.width = `${progress}%`; 

    document.getElementById('numbers').innerText = `${completeTasks}/${totalTasks}`; 
};

document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});
