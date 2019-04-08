const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("unable to connect to database");
  }
  console.log("connected to the server");
  const db = client.db("TodoApp");
  db.collection("Todos")
    .find({})
    .count()
    .then(
      count => {
        console.log("Todos", count);
      },
      err => {
        console.log("unable to fetch todos", err);
      }
    );

  client.close();
});
