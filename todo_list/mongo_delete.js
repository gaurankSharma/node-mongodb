const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("unable to connect to database");
  }
  console.log("connected to the server");
  const db = client.db("TodoApp");

  // delete many item at once
  //   db.collection("Todos")
  //     .deleteMany({ name: "gaurank" })
  //     .then(result => {
  //       console.log(result);
  //     });

  //delete one
  //   db.collection("Todos")
  //     .deleteOne({ completed: false })
  //     .then(result => {
  //       console.log(result);
  //     });

  //find one and delete and get its value back
  db.collection("Todos")
    .findOneAndDelete({ work: "eat" })
    .then(result => {
      console.log(result);
    });

  //remove the duplications

  client.close();
});
