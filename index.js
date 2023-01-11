const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const TodoModel = require("./models/todo");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/api/todos", (request, response, next) => {
  const body = request.body;

  const todoInstance = new TodoModel({
    text: body.content,
  });

  todoInstance
    .save()
    .then((savedTodos) => {
      response.json(savedTodos);
    })
    .catch((error) => next(error));
});

app.get("/api/todos", (request, response) => {
  TodoModel.find({}).then((todos) => {
    response.json(todos);
  });
});

app.get("/api/todos/:id", (request, response) => {
  TodoModel.findById(request.params.id)
    .then((todo) => {
      response.json(todo);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

app.delete("/api/todos/:id", (request, response, next) => {
  TodoModel.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
