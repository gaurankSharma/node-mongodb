const mongoClient = require("mongodb");

mongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    console.log("unable to connect the mongodb ");
  }
  console.log("conntected sucsessfully ");
  const db = client.db("TodoApp");
  //   db.collection("Todos").insertOne(
  //     {
  //       text: "some thing",
  //       completed: false
  //     },
  //     (err, result) => {
  //       if (err) {
  //         console.log("error in todos ", err);
  //       }
  //       console.log(JSON.stringify(result.ops, undefined, 2));
  //     }
  //   );
  db.collection("Users").insertOne(
    {
      _id: 123,
      name: "gaurnak",
      age: "sharma",
      location: "bangalore"
    },
    (err, result) => {
      if (err) {
        console.log("unable to insert users", err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );
  client.close();
});
