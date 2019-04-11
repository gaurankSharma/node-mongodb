const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
MONGODB_URI =
  "mongodb+srv://gaurank24:garuank@todoapp-5hpih.mongodb.net/TodoApp?retryWrites=true/";

mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("connected");
  }
});

module.exports = {
  mongoose: mongoose
};
