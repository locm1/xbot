import React from "react";
import { isMobile } from "react-device-detect"

export default (props) => {
  const { name, title, id, value, checked, change, segmentid, isDefault } = props;

  return (
    <>
      <input type="checkbox" className="btn-check" checked={checked} id={id} name={name} value={value} data-segmentid={segmentid} data-isdefault={isDefault} onChange={change} />
      <label className={`btn btn-outline-primary rounded-pill ${isMobile ? 'sp-checkbox-btn' : 'checkbox-btn'}`} htmlFor={id}>{title}</label>
    </>
  );
};
