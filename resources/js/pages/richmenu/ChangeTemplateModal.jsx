import React, { useState } from "react";
import { Col, Row, Form, Button, Image, Card, Modal } from 'react-bootstrap';

import squares1 from "@img/img/richmenu/squares1.jpg"
import squares1_1 from "@img/img/richmenu/squares1_1.jpg"
import squares1_2 from "@img/img/richmenu/squares1_2.jpg"
import squares1_3 from "@img/img/richmenu/squares1_3.jpg"
import squares2_2 from "@img/img/richmenu/squares2_2.jpg"
import squares4 from "@img/img/richmenu/squares4.jpg"
import squares6 from "@img/img/richmenu/squares6.jpg"
import squares_half_1 from "@img/img/richmenu/squares_half_1.jpg"
import squares_half_1_1 from "@img/img/richmenu/squares_half_1_1.jpg"
import squares_half_1_2 from "@img/img/richmenu/squares_half_1_2.jpg"
import squares_half_2_1 from "@img/img/richmenu/squares_half_2_1.jpg"
import squares_half_3 from "@img/img/richmenu/squares_half_3.jpg"

export default (props) => {
  const { setTemplateModal, templateModal, show, setRichMenu, active, setActive } = props;

  const richmenu_1 = [
    {id: 1, img: squares6, size: 6, type: 1},
    {id: 2, img: squares4, size: 4, type: 2},
    {id: 3, img: squares1_3, size: 4, type: 3},
    {id: 4, img: squares1_2, size: 3, type: 4},
    {id: 5, img: squares1_1, size: 2, type: 5},
    {id: 6, img: squares2_2, size: 2, type: 6},
    {id: 7, img: squares1, size: 1, type: 7},
  ];

  const richmenu_2 = [
    {id: 8, img: squares_half_3, size: 3, type: 8},
    {id: 9, img: squares_half_1_2, size: 2, type: 9},
    {id: 10, img: squares_half_2_1, size: 2, type: 10},
    {id: 11, img: squares_half_1_1, size: 2, type: 11},
    {id: 12, img: squares_half_1, size: 1, type: 12},
  ];

  const handleModalClose = () => {
    setTemplateModal(!templateModal)
  };

  const handleClickContent = (menu) => {
    setActive(menu.id)
    setRichMenu(menu)
  };

	return (
		<>
      <Modal as={Modal.Dialog} centered show={show} onHide={handleModalClose} size="lg">
        <Modal.Header>
          <Modal.Title className="h6">テンプレートを選択</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleModalClose} />
        </Modal.Header>
        <Modal.Body>
          <div className="mt-1">
            <h6 className="mb-4 border-bottom pb-3">コンテンツ1</h6>
            <small>リッチメニューのコンテンツを多く表示する場合におすすめです。</small>
            <div className="d-flex flex-wrap richmenu-template">
              {
                richmenu_1.map((menu1, index) => 
                  <div className="richmenu-template" key={index}>
                    <Image onClick={() => handleClickContent(menu1)} src={menu1.img} className={`richmenu-template-image ${active == menu1.id ? 'active' : ''}`} />
                  </div>
                )
              }
            </div>
          </div>
          <div className="mt-3">
            <h6 className="mb-4 border-bottom pb-3">コンテンツ2</h6>
            <small>トークルームにバランスよくリッチメニューを表示する場合におすすめです。</small>
            <div className="d-flex flex-wrap richmenu-template">
              {
                richmenu_2.map((menu2, index) => 
                  <div className="richmenu-template" key={index}>
                    <Image onClick={() => handleClickContent(menu2)} src={menu2.img} className={`richmenu-template-image ${active == menu2.id ? 'active' : ''}`} />
                  </div>
                )
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="link" className="text-gray ms-auto" onClick={handleModalClose}>
              キャンセル
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            選択
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	)
}