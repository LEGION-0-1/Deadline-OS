const displayTasks = (tasks) => {
    const overdue = [];
    const dueToday = [];
    const thisWeek = [];
    const nextWeek = [];
    const noDeadline = [];
    let taskCount = 0;
    let projectsCount = 0;
    let researchCount = 0;

    console.log("=== DEADLINE OS ===");
    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        if (task.status !== "COMPLETED") {
            if (task.deadline) {
                const deadline = new Date(task.deadline);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (deadline < today) {
                    overdue.push(task);
                } else if (deadline.toDateString() === today.toDateString()) {
                    dueToday.push(task);
                } else if (deadline <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                    thisWeek.push(task);
                } else {
                    nextWeek.push(task);
                }
            } else {
                noDeadline.push(task);
            }
        }

        if (task.type === "TASK" && task.status !== "COMPLETED") {
            taskCount++;
        } else if (task.type === "PROJECT" && task.status !== "COMPLETED") {
            projectsCount++;
        } else if (task.type === "RESEARCH" && task.status !== "COMPLETED") {
            researchCount++;
        }
    }

    if (taskCount > 0) {
        console.log("---- TASKS ----\nTasks: " + taskCount);
    }if (projectsCount > 0) {
        console.log("---- PROJECTS ----\nProjects: " + projectsCount);
    }if (researchCount > 0) {
        console.log("---- RESEARCH ----\nResearch: " + researchCount);
    }if (overdue.length > 0) {
        console.log("---- OVERDUE ----");
        overdue.forEach(printTask);
    }if (dueToday.length > 0) {
        console.log("---- DUE TODAY ----");
        dueToday.forEach(printTask);
    }if (thisWeek.length > 0) {
        console.log("---- THIS WEEK ----");
        thisWeek.forEach(printTask);
    }if (nextWeek.length > 0) {
        console.log("---- NEXT WEEK ----");
        nextWeek.forEach(printTask);
    }if (noDeadline.length > 0) {
        console.log("---- NO DEADLINE ----");
        noDeadline.forEach(printTask);
    }
}

const printTask = (task) => {
    console.log("#" + task.id + " [" + task.type + "] " + task.title);
}

module.exports = {
    displayTasks
}