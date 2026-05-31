const dash = require("./dashboard");
const mgr = require("./taskManager")
const tasks = mgr.getTasks();
const command = process.argv[2];
const taskTitle = process.argv[3];
const taskId = parseInt(process.argv[3]);
const priority = process.argv[4];
const deadline = new Date(process.argv[4]);

if (command === "add") {    
    const task = {
    type: "TASK",
    title: taskTitle || "Untitled Task",
    status: "TODO",
    priority: priority || "MEDIUM",
    category: "University",
    deadline: null,
    subtasks: [],
    createdAt: new Date().toISOString(),
    completedAt: null
};

    mgr.addTask(task);
    console.log("Task added successfully!");
}
else if (command === "list") {
    dash.displayTasks(tasks);
}
else if (command === "complete") {
        mgr.updateTask(taskId, { status: "COMPLETED", completedAt: new Date().toISOString() });
        console.log("Task marked as complete!"); 
}
else if (command === "deadline") {
    mgr.updateTask(taskId, { deadline: deadline });
    console.log("Task deadline updated!");
}
else{
console.log("Sorry...");}