const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://gaurank24:garuank@todoapp-5hpih.mongodb.net/test?retryWrites=true/TodoApp"
);

module.exports = {
  mongoose: mongoose
};
