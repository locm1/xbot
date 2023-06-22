import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import withReactContent from 'sweetalert2-react-content';
import liff from '@line/liff';
import Swal from 'sweetalert2';
import { LoadingContext } from "@/components/LoadingContext";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getOrderDestinations, updateOrderDestination, updateOrderDestinations, deleteOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import ContentLoader from "react-content-loader";
import OrderDestinationsContentLoader from "@/pages/liff/checkout/loader/OrderDestinationsContentLoader";
import testData from "./test/LiffCheckoutAddressData"

export default () => {
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectId, setSelectId] = useState();
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [liffToken, setLiffToken] = useState('');

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

  const handleDelete = (id) => {
    const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-gray-400 me-3'
      },
      buttonsStyling: false
    }));
    SwalWithBootstrapButtons.fire({
      title: '削除確認',
      text: "本当に削除しますか？",
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'キャンセル',
      confirmButtonText: '削除する'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrderDestination(user.id, id, liffToken)
          Swal.fire(
            `削除完了`,
            '削除に成功しました。',
            'success'
          ).then((result) => {
            setIsRendered(false)
            fetch()
          })
        } catch (error) {
          console.error(error);
          Swal.fire(
            `データ削除エラー`,
            'データが正常に削除できませんでした',
            'error'
          )
        }
      }
    })
  }

  const updateComplete = () => {
    history.push(Paths.LiffCheckout.path);
  };

  useEffect(() => {
    fetch();
    /** test用 **/
    // setDeliveryAddresses(testData);
  }, []);

  const DeliveryAddressItem = (props) => {
    const { id, index, last_name, first_name, zipcode, prefecture, city, address, building_name, tel } = props;
    const target_split = zipcode && zipcode.substr(0, 3);
    const link = Paths.LiffCheckoutEditAddress.path.replace(':id', id);

    return (
      <Card className="mt-3 p-3">
        <div className="d-flex align-items-center justify-content-center">
          <Col className="justify-content-center">
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
          <Col xs="9" className="px-0">
            <div className="m-1">
              <div className="">{last_name} {first_name} 様</div>
              <div className="">〒 {target_split}-{zipcode && zipcode.split(target_split)[1]}</div>
              <div className="">℡ {tel}</div>
            </div>
          </Col>
          <Col>
            <Link className="d-block my-2 text-decoration-underline" to={link}>編集</Link>
            <Link className="d-block my-2 text-decoration-underline" onClick={() => handleDelete(id)}>削除</Link>
          </Col>
        </div>
      </Card>
    );
  }

  return (
    <>
      <main className="p-3">
        <Link to={Paths.LiffCheckout.path} className="">
          <ChevronLeftIcon className="icon icon-sm" />
          <div className="d-inline">商品確認画面へ戻る</div>
        </Link>
        <div className="liff-product-list">
          <Card border="0" className="shadow">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">お届け先住所の選択</h5>
            </Card.Header>
            <Card.Body className="py-0 px-3">
              {
                isRendered ? (
                  <>
                    <ListGroup className="list-group-flush">
                      {deliveryAddresses.map((deliveryAddress, index) => <DeliveryAddressItem key={`address-${deliveryAddress.id}`} {...deliveryAddress} index={index} />)}
                    </ListGroup>
                    {/* <Button variant="outline-primary" onClick={() => history.push(Paths.LiffCheckoutAddress.path)}>お届け先住所を追加</Button> */}
                    <Link to={Paths.LiffCheckoutAddress.path} className="d-flex align-items-center border-bottom py-3 justify-content-around">
                      <div className="">お届け先住所を追加</div>
                      <div className="">
                        <ChevronRightIcon className="icon icon-sm" />
                      </div>
                    </Link>
                    <div className="align-items-center my-4">
                      <Button onClick={handleClick} variant="success" className="w-100 p-3">
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