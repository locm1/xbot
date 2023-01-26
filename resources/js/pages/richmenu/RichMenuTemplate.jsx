import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Col, Row, Form, Button, ListGroup, Card, Modal, Image } from 'react-bootstrap';
import { XIcon } from "@heroicons/react/solid";


export default (props) => {
  const { richMenu, templateActive, setTemplateActive } = props;

  const contents = [...Array(richMenu.size)].map((v, i) => {
    return String.fromCodePoint(i + 65);
  });

  const ShowTemplate = (props) => {
    const { richMenu } = props;

    const richMenuTemplate = {
      1: <RichMenuTemplate1 />,
      2: <RichMenuTemplate2 />,
      3: <RichMenuTemplate3 />,
      4: <RichMenuTemplate4 />,
      5: <RichMenuTemplate5 />,
      6: <RichMenuTemplate6 />,
      7: <RichMenuTemplate7 />,
      8: <RichMenuTemplate8 />,
      9: <RichMenuTemplate9 />,
      10: <RichMenuTemplate10 />,
      11: <RichMenuTemplate11 />,
      12: <RichMenuTemplate12 />,
    }

    return richMenuTemplate[richMenu.type];
  };

  const handleClickContent = (value) => {
    setTemplateActive(value)
  };

  const RichMenuTemplate1 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          {
            contents.map((content, index) =>
              <div key={index} onClick={() => handleClickContent(index + 1)} className={`line-rich-menu-template-item item-type-1 ${templateActive == index + 1 ? 'template-active' : ''}`}>
                {content}
              </div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate2 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          {
            contents.map((content, index) => 
              <div onClick={() => handleClickContent(index + 1)} className={`line-rich-menu-template-item item-type-2 ${templateActive == index + 1 ? 'template-active' : ''}`}>{content}</div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate3 = () => {
    contents.shift();
    
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="line-rich-menu-template">
          <div className={`line-rich-menu-template-item item-type-3 ${templateActive == 1 ? 'template-active' : ''}`} onClick={() => handleClickContent(1)}>A</div>
        </div>
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          {
            contents.map((content, index) => 
              <div onClick={() => handleClickContent(index + 2)} className={`line-rich-menu-template-item item-type-1 ${templateActive == index + 2 ? 'template-active' : ''}`}>{content}</div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate4 = () => {
    contents.shift();
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="line-rich-menu-template d-flex">
          <div className={`line-rich-menu-template-item item-type-4-left ${templateActive == 1 ? 'template-active' : ''}`} onClick={() => handleClickContent(1)}>A</div>
          <div className="line-rich-menu-template item-type-4-right">
            {
              contents.map((content, index) => 
                <div onClick={() => handleClickContent(index + 2)} className={`line-rich-menu-template-item item-type-4-right-item ${templateActive == index + 2 ? 'template-active' : ''}`}>{content}</div>
              )
            }
          </div>
        </div>
      </div>
    );
  };

  const RichMenuTemplate5 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="line-rich-menu-template">
          {
            contents.map((content, index) => 
              <div onClick={() => handleClickContent(index + 1)} className={`line-rich-menu-template-item item-type-5 ${templateActive == index + 1 ? 'template-active' : ''}`}>{content}</div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate6 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          {
            contents.map((content, index) => 
              <div onClick={() => handleClickContent(index + 1)} className={`line-rich-menu-template-item item-type-6 ${templateActive == index + 1 ? 'template-active' : ''}`}>{content}</div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate7 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="line-rich-menu-template">
          <div onClick={() => handleClickContent(1)} className={`line-rich-menu-template-item item-type-7 ${templateActive == 1 ? 'template-active' : ''}`}>A</div>
        </div>
      </div>
    );
  };

  const RichMenuTemplate8 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          {
            contents.map((content, index) => 
              <div onClick={() => handleClickContent(index + 1)} className={`line-rich-menu-template-item item-type-1 ${templateActive == index + 1 ? 'template-active' : ''}`}>{content}</div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate9 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          <div onClick={() => handleClickContent(1)} className={`line-rich-menu-template-item item-type-3 item-type-4-right ${templateActive == 1 ? 'template-active' : ''}`}>A</div>
          <div onClick={() => handleClickContent(2)} className={`line-rich-menu-template-item item-type-3 item-type-9-right ${templateActive == 2 ? 'template-active' : ''}`}>B</div>
        </div>
      </div>
    );
  };

  const RichMenuTemplate10 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          <div onClick={() => handleClickContent(1)} className={`line-rich-menu-template-item item-type-3 item-type-9-right ${templateActive == 1 ? 'template-active' : ''}`}>A</div>
          <div onClick={() => handleClickContent(2)} className={`line-rich-menu-template-item item-type-3 item-type-4-right ${templateActive == 2 ? 'template-active' : ''}`}>B</div>
        </div>
      </div>
    );
  };

  const RichMenuTemplate11 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="d-flex align-items-center flex-wrap line-rich-menu-template">
          {
            contents.map((content, index) => 
              <div onClick={() => handleClickContent(index + 1)} className={`line-rich-menu-template-item item-type-3 item-type-11 ${templateActive == index + 1 ? 'template-active' : ''}`}>{content}</div>
            )
          }
        </div>
      </div>
    );
  };

  const RichMenuTemplate12 = () => {
    return (
      <div className="line-rich-menu-template-wrap">
        <div className="line-rich-menu-template">
          <div onClick={() => handleClickContent(1)} className={`line-rich-menu-template-item item-type-3 ${templateActive == 1 ? 'template-active' : ''}`}>A</div>
        </div>
      </div>
    );
  };
  
	return (
		<>
    <ShowTemplate richMenu={richMenu} templateActive={templateActive} />
		</>
	)
}