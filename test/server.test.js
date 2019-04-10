const expect = require("expect");
const request = require("supertest");
const { ObjectId } = require("mongodb");

const { app } = require("./../server/server");
const { todo } = require("./../server/models/todo");

const todos = [
  {
    _id: new ObjectId(),
    text: "first todo"
  },
  {
    _id: new ObjectId(),
    text: "second todo"
  }
];

beforeEach(done => {
  todo
    .remove({})
    .then(() => {
      return todo.insertMany(todos);
    })
    .then(() => {
      done();
    });
});

describe("POST /todos", () => {
  it("should create a todo ", done => {
    let text = "test todo text";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        todo
          .find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });
  it("should not send empty todo", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        todo
          .find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe(" GET /todos", () => {
  it("should get all todos ", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos doc per id", () => {
  it("should get the todo by id", done => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404 when todo not found", done => {
    request(app)
      .get(`/todos/5cac734d78df1a48ab78ec13`)
      .expect(404)
      .end(done);
  });
  it("shuld return 404 when id is not vailid", done => {
    request(app)
      .get("/todos/123bfg")
      .expect(404)
      .end(done);
  });
});
