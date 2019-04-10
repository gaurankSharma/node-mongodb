const { ObjectId } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

let id = "5cac734d78df1a48ab78ecn13";
if (!ObjectId.isValid(id)) {
  console.log("id is not valid");
}
// todo
//   .find({
//     _id: id
//   })
//   .then(todos => {
//     console.log("todos", todos);
//   });

// todo
//   .findOne({
//     _id: id
//   })
//   .then(todos => {
//     console.log("todos", todos);
//   });

// todo
//   .findById(id)
//   .then(todos => {
//     if (!todos) {
//       return console.log("id not found");
//     }
//     console.log("todos bu id", todos);
//   })
//   .catch(e => {
//     console.log(e);
//   });
User.findById(id)
  .then(todos => {
    if (!todos) {
      return console.log("id not found");
    }
    console.log("todos bu id", todos);
  })
  .catch(e => {
    console.log(e);
  });
