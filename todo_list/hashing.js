const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let password = "1234cc";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
let hashpassword =
  "$2a$10$cQtG0oSIN4GmSCqD85xYO.cUVbF25wUAR4ett3CICB0AXvwrSpHM6";

bcrypt.compare(password, hashpassword, (err, res) => {
  console.log(res);
});

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data + "some")).toString()
// };

// jwt.verify;

// let message = "i am user number 12";
// let hash = SHA256(message).toString();

// console.log(`message : ${message}`);
// console.log(`hash : ${hash}`);

// let data = {
//   id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data + "some")).toString()
// };

// let result = SHA256(JSON.stringify(token.data + "some")).toString();
// if (result === token.hash) {
//   console.log("value not changed ");
// } else {
//   console.log("value changed");
// }
