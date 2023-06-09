import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import liff from '@line/liff';
import Swal from 'sweetalert2';
import { LoadingContext } from "@/components/LoadingContext";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getOrderDestinations, updateOrderDestination, updateOrderDestinations } from "@/pages/liff/api/OrderDestinationApiMethods";
import ContentLoader from "react-content-loader";
import OrderDestinationsContentLoader from "@/pages/liff/checkout/loader/OrderDestinationsContentLoader";

export default () => {
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectId, setSelectId] = useState();
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [liffToken, setLiffToken] = useState('');


  const handleClick = async () => {
    const updateAddress = deliveryAddresses.find((deliveryAddress) => deliveryAddress.id === selectId);
    updateAddress.is_selected = 1
    updateAddress.liffToken = liffToken
    console.log(updateAddress);
    try {
      await updateOrderDestinations(user.id, liffToken)
      await updateOrderDestination(user.id, updateAddress.id, updateAddress)
      updateComplete()
    } catch (error) {
      console.error(error);
      Swal.fire(
        `データ保存エラー`,
        'データが正常に保存できませんでした',
        'error'
      )
    }
    //updateOrderDestination(user.id, updateAddress.id, updateAddress, updateComplete)
  }

  const updateComplete = () => {
    history.push(Paths.LiffCheckout.path);
  };

  useEffect(() => {
    const fetch = async () => {
      const idToken = liff.getIDToken();
      setLiffToken(idToken)
      try {
        const response = await getUser(idToken, setUser);
        await getOrderDestinations(response.id, idToken, setDeliveryAddresses, setSelectId);
      } catch (error) {
        console.error(error);
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        ).then((result) => {
          //LIFF閉じる
          liff.closeWindow()
        })
      } finally {
        setIsRendered(true);
      }
    }
    fetch();
  }, []);

  const DeliveryAddressItem = (props) => {
    const { id, index, last_name, first_name, zipcode, prefecture, city, address, building_name, tel } = props;
    const target_split = zipcode && zipcode.substr(0, 3);
    const link = Paths.LiffCheckoutEditAddress.path.replace(':id', id);

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="2" className="mt-5">
            <Form.Check
              type="radio"
              name="delivery_address"
              value={id}
              checked={id === selectId}
              id={id}
              htmlFor={id}
              onChange={() => setSelectId(id)}
            />
          </Col>
          <Col xs="8" className="px-0">
            <Link className="fs-6 text-dark delivery-address-item-edit" to={link}>編集</Link>
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-0">{last_name} {first_name} 様</h4>
              <h4 className="fs-6 text-dark mt-1">〒{target_split}-{zipcode && zipcode.split(target_split)[1]}</h4>
              <h4 className="fs-6 text-dark mt-1">
                {prefecture} {city} {address} {building_name}
              </h4>
              <h4 className="fs-6 text-dark mt-1">{tel}</h4>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
    <main className="liff-product-detail p-3">
      <div className="">
        <Link to={Paths.LiffCheckout.path} className="d-flex align-items-center p-2">
          <div className="">
            <span className="link-arrow">
              <ChevronLeftIcon className="icon icon-sm" />
            </span>
          </div>
          <h2 className="fs-6 fw-bold mb-0 ms-2">戻る</h2>
        </Link>
      </div>
      <div className="liff-product-list">
        <Card border="0" className="shadow">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">お届け先住所の選択</h5>
          </Card.Header>
          <Card.Body className="py-0">
            {
              isRendered ? (
                <>
                  <ListGroup className="list-group-flush">
                    {deliveryAddresses.map((deliveryAddress, index) => <DeliveryAddressItem key={`address-${deliveryAddress.id}`} {...deliveryAddress} index={index} />)}
                  </ListGroup>
                  <Link to={Paths.LiffCheckoutAddress.path} className="d-flex align-items-center border-bottom py-3">
                    <h2 className="fs-6 fw-bold mb-0">お届け先住所を追加</h2>
                    <div className="ms-auto">
                      <span className="link-arrow">
                        <ChevronRightIcon className="icon icon-sm" />
                      </span>
                    </div>
                  </Link>
                  <div className="align-items-center my-4">
                    <Button onClick={handleClick} variant="tertiary" className="w-100 p-3">
                      変更する
                    </Button>
                  </div>
                </>
              ) : (
                <OrderDestinationsContentLoader />
              )
            }
          </Card.Body>
        </Card>
      </div>
    </main>
    </>
  );
};