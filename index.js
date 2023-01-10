const express = require("express");
const app = express();
const cors = require("cors");

let todos = [
  {
    id: 1,
    text: "HTML is easy",
    description: "hey whats app",
    done: true,
  },
  {
    id: 2,
    text: "Browser can execute only Javascript",
    description: "Hola amigazo",
    done: false,
  },
  {
    id: 3,
    text: "GET and POST are the most done methods of HTTP protocol",
    description: "Hey hey hey",
    done: true,
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);
app.use(cors());
app.use(express.json());

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/todos", (request, response) => {
  response.json(todos);
});

app.get("/api/todos/:id", (request, response) => {
  const id = Number(request.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    response.json(todo);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/todos/:id", (request, response) => {
  const id = Number(request.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const todo = {
    text: body.content,
    description: body.description || false,
    done: false,
    id: generateId(),
  };

  notes = notes.concat(todo);

  response.json(todo);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
