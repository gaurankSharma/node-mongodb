const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

let data = {
  id: 4
};
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data + "some")).toString()
// };

let token = jwt.sign(data, "123abc");
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
