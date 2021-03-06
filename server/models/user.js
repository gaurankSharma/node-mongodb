const mongoos = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

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
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ["_id", "Email"]);
};

userSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = "auth";
  let token = jwt.sign({ _id: user._id, access }, "abc123").toString();
  user.tokens.push({ access, token });
  //user.tokens = user.tokens.concat([{ acsess, token }]);
  return user.save().then(() => {
    return token;
  });
};

userSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

userSchema.statics.findByCredentials = function (email, password) {
  let User = this;
  return User.findOne({ Email: email }).then(user => {
    if (!user) {
      return Promise.reject();
    } else {
      return new Promise((resolve, reject) => {

        bcrypt.compare(password, user.Password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      })
    }
  })

}

userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('Password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.Password, salt, (err, hash) => {
        user.Password = hash;
        console.log(user);
        next();
      })
    })
  } else {
    next()
  }

})

//createing user
let User = mongoos.model("User", userSchema);

module.exports = { User };
