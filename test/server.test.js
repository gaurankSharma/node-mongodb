const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server/server");
const { todo } = require("./../server/models/todo");

beforeEach(done => {
  todo.remove({}).then(() => done());
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
          .find()
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
            expect(todos.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
