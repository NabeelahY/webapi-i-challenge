import React, { useEffect, useState } from "react";
import axios from "axios";

const Characters = () => {
  const [chars, setChars] = useState([]);

  const getChars = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then(res =>
        // console.log(res);
        setChars(res.data)
      )
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
      {chars.map(char => (
        <div key={char.id}>
          {char.name} <span onClick={() => deleteChar(char.id)}>&#10006;</span>
        </div>
      ))}
    </div>
  );
};

export default Characters;
