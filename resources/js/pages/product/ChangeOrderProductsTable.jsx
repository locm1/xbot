import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Modal, ProgressBar, Pagination, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export const ChangeOrderProductsTable = (props) => {
  const [{products}, setProducts] = useState(props);
  const getCategoryClass = (category) => {
    switch (category) {
      case 1:
        return {
          class: 'secondary',
          name: 'ヘアケア'
        }
      case 2:
        return {
          class: 'success',
          name: 'テスト'
        }
      case 3:
        return {
          class: 'danger',
          name: '野菜'
        }
      case 4:
        return {
          class: 'warning',
          name: 'テスト'
        }
      case 5:
        return {
          class: 'info',
          name: '食品'
        }
      default:
        return {
          class: 'primary',
          name: 'テスト'
        }
    }
  }
  function handleOnDragEnd(result) {
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts({products});
  }

  const TableRow = (props) => {
    const { category, name, price, stockQuantity, img, id, index } = props;
    if (category === 1) {
      return (
        <Draggable key={id} draggableId={"q-" + id} index={index}>
          {(provided) => (
            <tr className="border-bottom product-table-tr" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <td style={{ width: "500px"}}>
                <div className="d-flex align-items-center">
                  <Image src={img} className="me-3 product-image"/>
                  <div className="fw-bold">
                    <Link to={`/product/edit/${id}`} className="fw-bolder">
                      <span className="">{name}</span>
                    </Link>
                  </div>
                </div>
              </td>
              <td style={{ width: "500px"}}>
                <Badge bg={getCategoryClass(category).class} className="me-1 product-category-badge fw-normal">
                  {getCategoryClass(category).name}
                </Badge>
              </td>
              <td style={{ width: "500px"}}>
                <span className="fw-normal">
                  {price}
                </span>
              </td>
              <td style={{ width: "500px"}}>
                <span className="fw-normal">
                  {stockQuantity}
                </span>
              </td>
              <td style={{ width: "500px"}}>
                <Link to={`/product/edit/${id}`}>
                  <PencilAltIcon className="icon icon-xs me-2"/>
                </Link>
                <TrashIcon role="button" className="icon icon-xs text-danger me-2 " />
              </td>
              {provided.placeholder}
            </tr>
          )}
        </Draggable>
      );
    } else {
      return;
    };
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table hover>
          <thead>
            <tr>
              <th className="border-gray-200">商品名</th>
              <th className="border-gray-200">カテゴリー</th>
              <th className="border-gray-200">販売価格</th>
              <th className="border-gray-200">残在庫数</th>
              <th className="border-gray-200">編集・削除</th>
            </tr>
          </thead>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="products">
                {(provided) => (
                  <tbody className="border-0" {...provided.droppableProps} ref={provided.innerRef}>
                    {products.map((t, index) => <TableRow key={`products-${t.id}`} {...t} index={index} />)}
                  </tbody>
                )}
              </Droppable>
            </DragDropContext>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};