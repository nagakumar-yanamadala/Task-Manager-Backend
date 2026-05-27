const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();

const { TodoRouter } = require('./routes/todosRoute');


// MIDDLEWARES
app.use(methodOverride('_method'));

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, 'public')
  )
);


// ROUTES
app.use(TodoRouter);


// DATABASE CONNECTION
const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log('MongoDB Connected');

  } catch (error) {

    console.log(error.message);
    process.exit(1);
  }
};

connectDB();


// SERVER
const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(
    `Task Manager running on port ${PORT}`
  );
});