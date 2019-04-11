const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://gaurank24:garuank@todoapp-5hpih.mongodb.net/TodoApp?retryWrites=true/"
);

module.exports = {
  mongoose: mongoose
};
