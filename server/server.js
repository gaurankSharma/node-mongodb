const express = require("express");
const bodyparser = require("body-parser");

const { mongoos } = require("./db/mongoose");
const { todo } = require("./models/todo");
const { User } = require("./models/user");

app = express();

app.use(bodyparser.json());
app.post("/todos", (req, res) => {
  let todos = new todo({
    text: req.body.text
  });
  todos.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e.message);
    }
  );
});

app.listen(3000, () => {
  console.log("started on 3000");
});
