const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
uri =
  "mongodb+srv://gaurank24:garuank@todoapp-5hpih.mongodb.net/TodoApp?retryWrites=true/";

mongoose.connect(uri, err => {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("connected");
  }
});

module.exports = {
  mongoose: mongoose
};
