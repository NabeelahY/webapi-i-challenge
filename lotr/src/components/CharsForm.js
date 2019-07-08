import React from "react";

const CharsForm = props => {
  return (
    <form onSubmit={props.newChars}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={props.chars.name}
        onChange={e => props.setChar({ ...props.chars, name: e.target.value })}
      />
      <input
        type="text"
        name="bio"
        placeholder="Enter bio"
        value={props.chars.bio}
        onChange={e => props.setChar({ ...props.chars, bio: e.target.value })}
      />
      <input type="submit" value="submit" />
    </form>
  );
};

export default CharsForm;
