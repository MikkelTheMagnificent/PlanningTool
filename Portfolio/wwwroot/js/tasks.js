document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.getElementById("tasks");
    const calendar = document.getElementById("calendar");
    const notes = document.getElementById("notes");
    const mainContent = document.getElementById("main-content");

    const modal = document.getElementById("taskModal");
    const closeModal = modal.querySelector(".close");

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
                            <!-- Dynamically populate tasks here -->
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

        document.querySelector(".add-new").addEventListener("click", () => {
            modal.style.display = "block"; /* Show modal */
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; /* Hide modal */
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none"; /* Hide modal if backdrop is clicked */
        }
    });

    calendar.addEventListener("click", () => {
        console.log("Calendar clicked");
        mainContent.innerHTML = `<p>Calendar view coming soon!</p>`;
    });

    notes.addEventListener("click", () => {
        mainContent.innerHTML = `<p>Notes view coming soon!</p>`;
    });
});
