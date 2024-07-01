// CRUD operations
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
//
// const ObjectID = mongodb.ObjectId;
// const id = new ObjectID();
// console.log("id :: " + id.id.length);
// console.log(id.toHexString().length);
// console.log("id timestamp :: " + id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database ", error);
    }
    console.log("Connected to Mongo ,");
    const db = client.db(databaseName);

    /*****Insert database *****/

    db.collection("users").insertOne(
      {
        name: "Jen",
        age: 25,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to inser user ", error);
        }
        console.log(result.insertedId);
      }
    );

    /**************************************************************** */

    // db.collection("users").insertMany(
    //   [
    //     { name: "Jarwis", age: 5 },
    //     { name: "Steve", age: 100 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to inser user ", error);
    //     }
    //     console.log(result.insertedIds);
    //   }
    // );

    /****************************** FIND ********************************** */

    // db.collection("users").findOne(
    //   { _id: new ObjectID("6303325a5439aacfab119a87") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to inser user ", error);
    //     }
    //     console.log(user);
    //   }
    // );

    /**************************************************************** */
    // db.collection("users")
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("Unable to inser user ", error);
    //     }
    //     console.log(users);
    //   });

    /**************************************************************** */

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("63032f3f4d9c551bb2d4d65c") },
    //   (error, task) => {
    //     console.log(task);
    //   }
    // );

    /**************************************************************** */

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log("Unable to inser user ", error);
    //     }
    //     console.log(tasks);
    //   });

    /************************************************* UPDATE ************************************************************* */

    // const updatePromise = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectID("6303287fa87d70f2e0697b2a"),
    //   },
    //   {
    //     // $set: {
    //     //   name: "Bruce",
    //     //   age: 18,
    //     // },
    //     $inc: {
    //       // increament the age by 1
    //       age: 1,
    //     },
    //   }
    // );
    // updatePromise
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /**************************************************************** */

    // const updateManyPromise = db.collection("tasks").updateMany(
    //   {
    //     completed: false,
    //   },
    //   {
    //     $set: {
    //       completed: true,
    //     },
    //   }
    // );
    // updateManyPromise
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /************************************************* DELETE ************************************************************* */

    // db.collection("users")
    //   .deleteMany({
    //     age: 27,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .deleteOne({
    //     age: 21,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);
