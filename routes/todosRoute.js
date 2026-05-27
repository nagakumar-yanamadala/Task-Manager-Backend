const express = require('express');

const TodoRouter = express.Router();

const {
  getTodos,
  addTodos,
  getCompletedTasks,
  getTaskDetails,
  addToCompletedTasks,
  moveBackTask,
  updateTask,
  deleteTask
} = require('../controllers/todosController');


// GET PENDING TODOS
TodoRouter.get('/api/todos', getTodos);


// CREATE TODO
TodoRouter.post('/api/todos', addTodos);


// GET COMPLETED TODOS
TodoRouter.get(
  '/api/todos/completed',
  getCompletedTasks
);


// GET SINGLE TODO
TodoRouter.get(
  '/api/todos/:id',
  getTaskDetails
);


// UPDATE TODO
TodoRouter.put(
  '/api/todos/:id',
  updateTask
);


// MARK AS COMPLETED
TodoRouter.patch(
  '/api/todos/:id/complete',
  addToCompletedTasks
);


// MOVE BACK TO PENDING
TodoRouter.patch(
  '/api/todos/:id/moveback',
  moveBackTask
);


// DELETE TODO
TodoRouter.delete(
  '/api/todos/:id',
  deleteTask
);


module.exports = { TodoRouter };