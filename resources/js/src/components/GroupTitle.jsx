
import React from "react";

export default (props) => {
  const { name } = props;

  return (
    <li className="group-title">{name}</li>
  );
};
