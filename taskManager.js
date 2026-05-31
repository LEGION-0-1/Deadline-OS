const fs = require("fs");

const getTasks = () => {
    const tasks = fs.readFileSync("./tasks.json", 'utf8');
    return JSON.parse(tasks);
}

const getMaxId = () => {
    const tasks = getTasks();
    if(tasks.length === 0){
        return 0;
    }else{
        return Math.max(...tasks.map(task => parseInt(task.id)));
    }
}

const saveTasks = (tasks) => {
    fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));
}

const addTask = (task) => {
    const tasks = getTasks();
    task.id = getMaxId() + 1;
    tasks.push(task);
    saveTasks(tasks);
}

const updateTask = (id, updates) => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        saveTasks(tasks);
    }else {
        console.log("Invalid task ID.");
    }
}

module.exports = {
    getTasks,
    addTask,
    updateTask
}