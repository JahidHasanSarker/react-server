const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
//const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = 5000;

//middleware

app.use(cors());
app.use(express.json());

//pass: 0RplHkdkBxrvtd2V
// name: reactHtmlDB

const uri =
  "mongodb+srv://reactHtmlDB:0RplHkdkBxrvtd2V@cluster0.gfhug.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("reactHtml");
    const usersCollection = database.collection("users");

    // const doc = { name: "Jahid Hasan", country: "Bangladesh" };
    // const result = await usersCollection.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // GET API

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // GET API for Update User

    // app.get("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const user = await usersCollection.findOne(query);
    //   res.send(user);
    // });

    // POST API

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("hit the user", user);
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.json(result);
    });

    // PUT/UPDATE API

    // app.put("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   //const query = {_id: ObjectId(id)}
    //   const updatedUser = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       name: updatedUser.name,
    //       email: updatedUser.email,
    //     },
    //   };
    //   const result = await usersCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   res.json(result);
    // });

    // DELETE API

    //     app.delete("/users/:id", async (req, res) => {
    //       const id = req.params.id;
    //       const query = { _id: ObjectId(id) };
    //       const result = await usersCollection.deleteOne(query);
    //       console.log("deleted user id", result);
    //       res.json(result);
    //     });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Practise My CRUD Server");
});

app.listen(port, () => {
  console.log(`Running Server at http://localhost:${port}`);
});
