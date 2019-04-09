const mongoos = require("mongoose");

//createing user
let User = mongoos.model("User", {
  Email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1
  }
});

module.exports = { User };
