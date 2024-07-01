const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const fileUpload = require("express-fileupload");

const swaggerJsDocs = YAML.load("./api.yaml");

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

const users = [
  {
    id: 1,
    name: "Stever",
  },
  {
    id: 2,
    name: "Bruce",
  },
];

app.get("/demo", (req, res) => {
  res.send("This is a response");
});

app.get("/user", (req, res) => {
  res.send({
    id: 1,
    name: "Test User",
  });
});

app.get("/users", (req, res) => {
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  const singleUser = users.find((user) => {
    return user.id == req.params.id;
  });
  if (!singleUser) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(singleUser);
});

app.post("/create", (req, res) => {
  users.push(req.body);
  return res.send(users);
});

app.get("/usersQuery", (req, res) => {
  const singleUser = users.find((user) => {
    return user.id == req.query.id;
  });
  if (!singleUser) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(singleUser);
});

app.post("/upload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/upload/" + "file" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    if (err) {
      return res.status(401).send(err);
    }
    res.send("Uploaded");
  });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
