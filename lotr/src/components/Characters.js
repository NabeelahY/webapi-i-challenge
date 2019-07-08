import React, { useEffect, useState } from "react";
import axios from "axios";
import CharsForm from "./CharsForm";

const Characters = () => {
  const [chars, setChars] = useState([]);
  const [newChar, setNewChar] = useState({
    name: "",
    bio: ""
  });

  const getChars = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then(res => setChars(res.data))
      .catch(err => err);
  };

  const addChars = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users", newChar)
      .then(res => {
        getChars();
        setNewChar({
          name: "",
          bio: ""
        });
      })
      .catch(err => err);
  };

  const deleteChar = id => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then(res => getChars())
      .catch(err => err);
  };

  useEffect(getChars, []);

  return (
    <div>
      <CharsForm newChars={addChars} setChar={setNewChar} chars={newChar} />
      {chars.map(char => (
        <div key={char.id}>
          {char.name} <span onClick={() => deleteChar(char.id)}>&#10006;</span>
        </div>
      ))}
    </div>
  );
};

export default Characters;
