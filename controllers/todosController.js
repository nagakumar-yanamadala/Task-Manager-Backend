const Todo = require('../models/todoModel');


// GET ALL PENDING TODOS
exports.getTodos = async (req, res) => {
  try {

    const todos = await Todo.find({ isCompleted: false });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// CREATE TODO
exports.addTodos = async (req, res) => {

  try {

    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {

      return res.status(400).json({
        success: false,
        message: 'Title and Description cannot be empty'
      });
    }

    const todo = await Todo.create({
      title,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET COMPLETED TODOS
exports.getCompletedTasks = async (req, res) => {

  try {

    const completedTasks = await Todo.find({
      isCompleted: true
    });

    res.status(200).json({
      success: true,
      count: completedTasks.length,
      data: completedTasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET SINGLE TODO
exports.getTaskDetails = async (req, res) => {

  try {

    const task = await Todo.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE TODO
exports.updateTask = async (req, res) => {

  try {

    const { title, description } = req.body;

    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {

      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// MARK TASK AS COMPLETED
exports.addToCompletedTasks = async (req, res) => {

  try {

    const task = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: true
      },
      {
        new: true
      }
    );

    if (!task) {

      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task marked as completed',
      data: task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// MOVE TASK BACK TO PENDING
exports.moveBackTask = async (req, res) => {

  try {

    const task = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: false
      },
      {
        new: true
      }
    );

    if (!task) {

      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task moved back to pending',
      data: task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE TODO
exports.deleteTask = async (req, res) => {

  try {

    const deletedTask = await Todo.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTask) {

      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};