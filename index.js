// implement your API here
const express = require("express");
const server = express();
const cors = require("cors");
const Users = require("./data/db");

server.use(express.json());
server.use(cors());

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
      !user
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  const newUser = {
    name: name,
    bio: bio
  };

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  const editUser = {
    name: name,
    bio: bio
  };

  if (!editUser.name || !editUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  Users.update(id, editUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(user => {
      !user
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
