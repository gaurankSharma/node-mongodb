const express = require("express");
const bodyparser = require("body-parser");
const { ObjectId } = require("mongodb");
const _ = require("lodash");

const { mongoos } = require("./db/mongoose");
const { todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
module.exports = { app };
const port = process.env.PORT || 3000;

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
// post api call for users
app.post("/user", (req, res) => {
  let body = _.pick(req.body, ["Email", "Password"]);
  let users = new User(body);
  users
    .save()
    .then(() => {
      return users.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(users);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

let authenticate = (req, res, next) => {
  let token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send();
    });
};

app.get("/user/me", authenticate, (req, res) => {
  res.send(req.user);
});

//user login wiht auth token  
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ["Email", "Password"]);
  User.findByCredentials(body.Email, body.Password).then(user => {
    user.generateAuthToken().then(token => {
      res.header("x-auth", token).send(user);
    })
  }).catch(e => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`the port is ${port}`);
});
