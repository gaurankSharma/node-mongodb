const mongoos = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

let userSchema = new mongoos.Schema({
  Email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `value is not vaild`
    }
  },
  Password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }
  ]
});
userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ["_id", "Email"]);
};

userSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt.sign({ _id: user._id, access }, "abc123").toString();
  user.tokens.push({ access, token });
  //user.tokens = user.tokens.concat([{ acsess, token }]);
  return user.save().then(() => {
    return token;
  });
};

//createing user
let User = mongoos.model("User", userSchema);

module.exports = { User };
