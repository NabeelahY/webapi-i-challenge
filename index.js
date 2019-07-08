// implement your API here
const express = require("express");
const server = express();
const Users = require("./data/db");

server.use(express.json());

server.get("/", (req, res) => {
  console.log("hello");
  res.json("hello");
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  const newUser = {
    name: name,
    bio: bio
  };

  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
