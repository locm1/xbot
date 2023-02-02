import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Modal, ProgressBar, Pagination, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export const ChangeOrderProductsTable = (props) => {
  const { products, setProducts, categoryName, color } = props;

  
  function handleOnDragEnd(result) {
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    setProducts(items);
  }

  const TableRow = (props) => {
    const { color, categoryName, product_category_id, name, price, stock_quantity, product_images, id, index } = props;
    const link = Paths.EditProduct.path.replace(':id', id);

    return (
      <Draggable key={id} draggableId={"q-" + id} index={index}>
        {(provided) => (
          <tr className="border-bottom product-table-tr" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <td style={{ width: "500px"}}>
              <div className="d-flex align-items-center">
                {
                  product_images && product_images[0] ? (
                    <Image src={product_images[0].image_path} className="me-3 product-image"/>
                  ) : (
                    <Image src={'/images/test_img/products/4698f9ba-8427-3497-97d7-7d48d1a3951c.jpeg'} className="me-3 product-image"/>
                  )
                }
                <div className="fw-bold">
                  <Link to={link} className="fw-bolder">
                    <span class="d-inline-block text-truncate" style={{maxWidth: '200px'}}>{name}</span>
                  </Link>
                </div>
              </div>
            </td>
            <td style={{ width: "500px"}}>
              <div style={{backgroundColor: color}} className="me-1 product-category-badge fw-normal">
                {categoryName}
              </div>
            </td>
            <td style={{ width: "500px"}}>
              <span className="fw-normal">
                {price}
              </span>
            </td>
            <td style={{ width: "500px"}}>
              <span className="fw-normal">
                {stock_quantity}
              </span>
            </td>
            <td style={{ width: "500px"}}>
              <Link to={link}>
                <PencilAltIcon className="icon icon-xs me-2"/>
              </Link>
              <TrashIcon role="button" className="icon icon-xs text-danger me-2 " />
            </td>
            {provided.placeholder}
          </tr>
        )}
      </Draggable>
    );
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
                    {
                      products.map((t, index) => 
                        <TableRow key={`products-${t.id}`} {...t} index={index} categoryName={categoryName} color={color} />
                      )
                    }
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