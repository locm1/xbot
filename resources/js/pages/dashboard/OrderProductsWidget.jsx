
import React, { useState, useEffect } from "react";
import { ArchiveIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import noImage from "@img/img/noimage.jpg"
import { Paths } from "@/paths";

export default (props) => {
  const { title, products } = props;

  const OrderProductItem = (props) => {
    const { name, product_images, count, id } = props;
    const link = Paths.EditProduct.path.replace(':id', id);

    const getImages = (image) => {
      if (image) {
        return image.image_path
      } else {
        return noImage;
      }
    }

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          <Col xs="auto">
            <Card.Link href="#" className="avatar-md">
              <Image rounded src={getImages(product_images[0])} className="m-0" />
            </Card.Link>
          </Col>
          <Col xs="auto" className="px-0">
            <h4 className="fs-6 text-dark mb-0">
              <Card.Link href={link}>
                {name}
              </Card.Link>
            </h4>
          </Col>
          <Col className="text-end">
            <span className="fs-6 fw-bolder text-dark">
              {count}個
            </span>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="border-bottom">
        <h2 className="fs-5 fw-bold mb-0">
          {title}
        </h2>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {products.map(product => <OrderProductItem key={`order-product-${product.id}`} {...product} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};