document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addTaskbtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksArray.forEach((task) => renderTask(task));
  addTaskbtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") {
      alert("Please Add text in the input Field");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };

    tasksArray.push(newTask);
    saveLocal();
    renderTask(newTask);
    input.value = "";
    console.log(tasksArray);
  });

  // **************************************** RENDER **********************************************
  // Function for rendering the task in html Template // Render is just a fancy name that we engineers use to display anything on DOM

  // Below we are talking about a single li so manipulate according to single element

  function renderTask(task) {
    // console.log(task);
    const li = document.createElement("li");
    li.innerHTML = `<span>${task.text}</span><button>Delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      saveLocal();
    });

    if (task.isCompleted) li.classList.add("completed");


    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // this will stop the bubbling up of event
      tasksArray = tasksArray.filter((t) => t.id != task.id);
      li.remove();
      saveLocal();
    });

    todoList.appendChild(li);
  }

  // *********************************************************************************************

  // method for adding task to the local storage

  function saveLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray)); // this is very important as it saves your changes to the local storage of browser so try to call it after every main function
  }
});
