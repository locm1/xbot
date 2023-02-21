import React from "react";

export default (props) => {
  const { name, title, id, value, checked, change, segmentid } = props;

  return (
    <>
      <input type="checkbox" className="btn-check" id={id} name={name} value={value} checked={checked} data-segmentid={segmentid} onChange={change} />
      <label className="btn btn-outline-tertiary rounded-pill checkbox-btn" htmlFor={id}>{title}</label>
    </>
  );
};
