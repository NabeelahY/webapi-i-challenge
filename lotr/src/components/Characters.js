import React, { useEffect, useState } from "react";
import axios from "axios";
import CharsForm from "./CharsForm";

const Characters = () => {
  const [chars, setChars] = useState([]);
  const [newChar, setNewChar] = useState({
    name: "",
    bio: ""
  });
  
  const [editing, setEdit] = useState(false);

  const getChars = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then(res => setChars(res.data))
      .catch(err => err);
  };
  
  const updateChars = id => {
    if (id) {
      setEdit(true);

      const newChars = chars.find(char => char.id === id);

      setNewChar({
        id: newChars.id,
        name: newChars.name,
        bio: newChars.bio
      });
    }
  };

  const addChars = e => {
    e.preventDefault();

    if (editing) {
      axios
        .put(`http://localhost:3000/api/users/${newChar.id}`, newChar)
        .then(res => {
          getChars();
          setEdit(false);
          setNewChar({
            name: "",
            bio: ""
          });
        })
        .catch(err => err);
    } else {
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
    }
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
          <button onClick={() => updateChars(char.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default Characters;
