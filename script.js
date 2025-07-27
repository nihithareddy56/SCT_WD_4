const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filterPriority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  const selectedFilter = filter.value;

  tasks.forEach((task, index) => {
    if (selectedFilter !== "All" && selectedFilter !== task.priority) return;

    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <div class="task-meta">${task.time} | Priority: ${task.priority}</div>
      </div>
      <div class="task-actions">
        <button class="complete-btn">✔</button>
        <button class="edit-btn">✎</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    li.querySelector(".complete-btn").onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    li.querySelector(".edit-btn").onclick = () => {
      const newText = prompt("Edit task text:", task.text);
      const newTime = prompt("Edit date & time:", task.time);
      if (newText && newTime) {
        task.text = newText;
        task.time = newTime;
        saveTasks();
        renderTasks();
      }
    };

    li.querySelector(".delete-btn").onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(li);
  });
}

form.onsubmit = function (e) {
  e.preventDefault();
  const text = document.getElementById("taskInput").value;
  const time = document.getElementById("taskTime").value;
  const priority = document.getElementById("taskPriority").value;

  tasks.push({ text, time, priority, completed: false });
  saveTasks();
  renderTasks();
  form.reset();
};

filter.onchange = renderTasks;
renderTasks();