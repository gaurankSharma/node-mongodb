const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("unable to connect to database");
  }
  console.log("connected to the server");
  const db = client.db("TodoApp");

  db.collection("Todos")
    .findOneAndUpdate(
      { name: "gaurank" },
      {
        $inc: {
          age: 1
        }
      },
      { returnOriginal: false }
    )
    .then(result => {
      console.log(result);
    });

  //client.close();
});
