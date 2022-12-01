import React from "react";

export default (props) => {
  const { name, title, id, value } = props;

  return (
    <>
    <input type="checkbox" className="btn-check" id={id} name={name} value={value} />
    <label className="btn btn-outline-tertiary rounded-pill checkbox-btn" for={id}>{title}</label>
    </>
  );
};
