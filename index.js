const express = require('express');
const { resolve } = require('path');
const app = express();
let cors = require('cors');

app.use(cors());

//const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//Endpoint 1. Add a Task to the Task List

function addToTask(tasks, taskId, text, priority) {
  tasks.push({ taskId, text, priority });
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addToTask(tasks, taskId, text, priority);
  res.json(result);
});

//Endpoint 2. Read All Tasks in the Task List

app.get('/tasks', (req, res) => {
  //let tasks = req.params.tasks;
  res.json(tasks);
});

//Endpoint 3. Sort Tasks by Priority

function sortByPriority(priority1, priority2) {
  return priority1.priority - priority2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let copyTasks = tasks.slice();
  //console.log(copyTask);
  copyTasks.sort(sortByPriority);
  res.json(copyTasks);
});

//Endpoint 4. Edit Task Priority

//let tasks = [
//  { taskId: 1, text: 'Fix bug #101', priority: 2 },
//  { taskId: 2, text: 'Implement feature #202', priority: 1 },
//  { taskId: 3, text: 'Write documentation', priority: 3 },
//];

function editPriority(tasks, taskId, priority) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editPriority(tasks, taskId, priority);
  res.json(result);
});

//Endpoint 5. Edit/Update Task Text

//let tasks = [
//  { taskId: 1, text: 'Fix bug #101', priority: 2 },
//  { taskId: 2, text: 'Implement feature #202', priority: 1 },
//  { taskId: 3, text: 'Write documentation', priority: 3 },
//];

function editText(tasks, taskId, text) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editText(tasks, taskId, text);
  res.json(result);
});

//Endpoint 6. Delete a Task from the Task List

function deleteTasksById(xyz, taskId) {
  return xyz.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((xyz) => deleteTasksById(xyz, taskId));
  res.json(result);
});

//Endpoint 7. Filter Tasks by Priority

function filterByPriority(xyz, priority) {
  return xyz.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  //console.log(tasks);
  let result = tasks.filter((xyz) => filterByPriority(xyz, priority));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
