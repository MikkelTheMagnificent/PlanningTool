document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.getElementById("tasks");
    const calendar = document.getElementById("calendar");
    const notes = document.getElementById("notes");
    const mainContent = document.getElementById("main-content");
    const modal = document.getElementById("taskModal");
    const closeModal = modal.querySelector(".close");
    const addTaskButton = document.getElementById("createTask");

    // Function to fetch all tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/tasks/all");
            const data = await response.json();

            console.log("Received data:", data);

            updateTasksUI(data.activeTasks, data.completedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const updateTasksUI = (activeTasks, completedTasks) => {
        const activeTasksTable = document.querySelector(".active-tasks");
        const completedTasksTable = document.querySelector(".completed-tasks");

        if (!activeTasksTable || !completedTasksTable) {
            console.error("Error: Missing active or completed tasks tables.");
            return;
        }

        activeTasksTable.innerHTML = "";
        completedTasksTable.innerHTML = "";

        activeTasks.forEach(task => {
            const name = task.Name || "";
            const status = task.Status || "";
            const color = task.Color || "#000000";
            const dueDate = task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "";

            console.log(`Active Task - Name: ${name}, Status: ${status}, Color: ${color}, DueDate: ${dueDate}`);

            const taskRow = document.createElement("tr");
            taskRow.innerHTML = `
               <td>${task.Name}</td>
               <td>${task.Status}</td>
               <td><span class="task-color" style="background-color: ${task.Color};">&nbsp;</span></td>
               <td>${task.DueDate ? new Date(task.DueDate).toLocaleDateString() : ""}</td>
                `;
            activeTasksTable.appendChild(taskRow);


        });

        completedTasks.forEach(task => {
            const name = task.Name || "";
            const status = task.Status || "";
            const color = task.Color || "#000000";
            const dueDate = task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "";

            console.log(`Completed Task - Name: ${name}, Status: ${status}, Color: ${color}, DueDate: ${dueDate}`);

            const taskRow = document.createElement("tr");
            taskRow.innerHTML = `
                <td>${name}</td>
                <td>${status}</td>
                <td><span class="task-color" style="background-color: ${color};">&nbsp;</span></td>
                <td>${dueDate}</td>
            `;
            completedTasksTable.appendChild(taskRow);
        });
    };


    tasks.addEventListener("click", () => {
        mainContent.innerHTML = `
            <div class="task-content">
                <button class="add-new">+ Add new</button>
                <div class="task-table">
                    <h3>Active tasks</h3>
                    <table class="task-parameters">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Status</th>
                                <th>Color</th>
                                <th>Due date</th>
                            </tr>
                        </thead>
                        <tbody class="active-tasks"></tbody>
                    </table>

                    <h3>Completed tasks</h3>
                    <table class="task-parameters">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Status</th>
                                <th>Color</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody class="completed-tasks"></tbody>
                    </table>
                </div>
            </div>
        `;

        fetchTasks();

        document.querySelector(".add-new").addEventListener("click", () => {
            modal.style.display = "block";
        });
    });





    // Event listener for adding a new task
    addTaskButton.addEventListener("click", async () => { // Add 'async' keyword here
        console.log("Create task button clicked");

        const taskName = document.getElementById("taskName").value;
        const taskStatus = document.getElementById("taskStatus").value;
        const taskColor = document.getElementById("taskColor").value;
        const taskDueDate = document.getElementById("taskDue").value;

        // Create task object
        const taskData = {
            Name: taskName,
            Status: taskStatus,
            Color: taskColor,
            DueDate: taskDueDate
        };

        // Log taskData to ensure correct data is being sent
        console.log("Task Data:", taskData);

        try {
            // Make POST request to API endpoint to add new task
            const response = await fetch("/api/tasks/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });

            // Log the response from the API
            console.log("API Response:", response);

            if (response.ok) {
                // Task added successfully, log response
                const newTask = await response.json();
                console.log("New task added:", newTask);

                // Optionally, you can update the UI to reflect the new task
                // For example, you can add the new task to the table
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                <td>${newTask.name}</td>
                <td>${newTask.status}</td>
                <td><span class="task-color" style="background-color: ${newTask.color};">&nbsp;</span></td>
                <td>${newTask.dueDate}</td>
            `;
                const activeTasksTable = document.querySelector(".active-tasks");
                activeTasksTable.appendChild(newRow);

                // Clear input fields and close modal
                document.getElementById("taskName").value = "";
                document.getElementById("taskStatus").value = "new";
                document.getElementById("taskColor").value = "#000000";
                document.getElementById("taskDue").value = "";
                modal.style.display = "none";
            } else {
                // Handle error response
                console.error("Error adding task:", response.statusText);
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error adding task:", error);
        }
    });

    tasks.addEventListener("click", () => {
        console.log("Tasks clicked");
        mainContent.innerHTML = `
            <div class="task-content">
                <button class="add-new">+ Add new</button>
                <div class="task-table">
                    <h3>Active tasks</h3>
                    <table class="task-parameters">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Status</th>
                                <th>Color</th>
                                <th>Due date</th>
                            </tr>
                        </thead>
                        <tbody class="active-tasks">
                            <tr>
                                <td>Example Task</td>
                                <td>New task</td>
                                <td><span class="task-color" style="background-color: #ADD8E6;">&nbsp;</span></td>
                                <td><i class="fas fa-calendar-alt"></i></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Completed tasks</h3>
                    <table class="task-parameters">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Status</th>
                                <th>Color</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody class="completed-tasks">
                            <tr>
                                <td colspan="4">No completed tasks yet.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        fetchTasks();

        // Event listener for adding a new task
        document.querySelector(".add-new").addEventListener("click", () => {
            modal.style.display = "block"; /* Show modal */
        });

    });

    // Function to add a new task
    const addTask = async (taskData) => {
        try {
            const response = await fetch("/api/tasks/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });
            const newTask = await response.json();
            console.log("New task added:", newTask);
            // Optionally, you can update the UI to reflect the new task
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };



    // Event listener for closing the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; /* Hide modal */
    });

    // Event listener for closing the modal when backdrop is clicked
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none"; /* Hide modal */
        }
    });

    calendar.addEventListener("click", () => {
        console.log("Calendar clicked");
        mainContent.innerHTML = `<p>Calendar view coming soon!</p>`;
    });

    notes.addEventListener("click", () => {
        mainContent.innerHTML = `<p>Notes view coming soon!</p>`;
    });

    fetchTasks();
});

///////////////////////////////////////////////////////////////
                     //TASKS END//
///////////////////////////////////////////////////////////////
