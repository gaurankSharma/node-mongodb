const express = require("express");
const bodyparser = require("body-parser");
const { ObjectId } = require("mongodb");

const { mongoos } = require("./db/mongoose");
const { todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
module.exports = { app };

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

app.get("/todos", (req, res) => {
  todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});
//get the request with id
app.get("/todos/:id", (req, res, next) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
  } else {
    todo.findById(id).then(
      todos => {
        if (!todos) {
          res.status(404).send();
        } else {
          res.send({ todos });
        }
      },
      e => res.status(404).send()
    );
  }
});

app.listen(3000, () => {
  console.log("started on 3000");
});
