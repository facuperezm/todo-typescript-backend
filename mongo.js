const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://facundopm:${password}@cluster0.jmjw4.mongodb.net/?retryWrites=true&w=majority`;

const todoSchema = new mongoose.Schema({
  id: Number,
  text: String,
  description: String,
  done: Boolean,
});

const Todo = mongoose.model("todo", todoSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
    Todo.find({}).then((result) => {
      result.forEach((todo) => {
        console.log(todo);
      });
      mongoose.connection.close();
    });

    return todo.save();
  })
  .then(() => {
    console.log("todo saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
