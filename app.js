// Initialize Firebase with your config
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            taskInput.value = "";
        }).catch(error => {
            console.error("Error adding task: ", error);
        });
    }
}

// Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// Real-time listener for tasks
db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            } else if (change.type === "removed") {
                const taskList = document.getElementById("task-list");
                const taskItems = taskList.getElementsByClassName("task-item");
                for (let i = 0; i < taskItems.length; i++) {
                    if (taskItems[i].querySelector("button").onclick.toString().includes(change.doc.id)) {
                        taskList.removeChild(taskItems[i]);
                        break;
                    }
                }
            }
        });
    });

// Function to delete a task
function deleteTask(id) {
    db.collection("tasks").doc(id).delete().catch(error => {
        console.error("Error deleting task: ", error);
    });
}
