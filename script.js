// Load tasks from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Array to hold tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskName = document.getElementById('task-name').value.trim();
    
    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const newTask = {
        name: taskName,
        status: "pending"  // New tasks start with "pending"
    };

    tasks.push(newTask);
    document.getElementById('task-name').value = ""; // Clear the input field
    saveTasks();  // Save the updated task list to localStorage
    renderTasks();  // Update the displayed tasks
}

// Function to change the status of a task
function changeStatus(index) {
    const task = tasks[index];

    // Cycle through the statuses: pending -> inprogress -> completed -> pending
    if (task.status === "pending") {
        task.status = "inprogress";
    } else if (task.status === "inprogress") {
        task.status = "completed";
    } else {
        task.status = "pending";
    }

    saveTasks();  // Save the updated task list to localStorage
    renderTasks();  // Update the displayed tasks
}

// Function to render tasks on the dashboard
function renderTasks() {
    const taskUl = document.getElementById('task-ul');
    taskUl.innerHTML = ""; // Clear the list before re-rendering

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const statusClass = `status-${task.status}`;
        li.innerHTML = `
            <span>${task.name}</span>
            <span class="task-status ${statusClass}">${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
            <button onclick="changeStatus(${index})">Change Status</button>
        `;

        taskUl.appendChild(li);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();  // Display the tasks once loaded
    }
}
