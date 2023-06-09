import React, { useState, useContext, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { PlusIcon, MinusIcon, ShoppingCartIcon, InboxIcon, TrashIcon } from '@heroicons/react/solid';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LoadingContext } from "@/components/LoadingContext";
import { LiffMockPlugin } from '@line/liff-mock';
import LiffCartSlideCard from "@/pages/liff/cart/LiffCartSlideCard";
import { isSalePeriod } from "@/components/common/IsSalePeriod";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getCarts, updateCart, deleteCart, storeRelatedProdcutInCart } from "@/pages/liff/api/CartApiMethods";
import ContentLoader from "react-content-loader";

export default () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isRendered, setIsRendered] = useState(false);
  const location = useLocation().pathname;
  const history = useHistory();
  const [carts, setCarts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [relatedProducts, setRelatedProducts] = useState([
    {
      discount_price: '', related_product: {
        name: '', price: '', product_images: [], product_sale: {
          discount_rate: '', start_date: '', end_date: ''
        }
      }
    }
  ]);
  const [itemsExistInCart, setItemsExistInCart] = useState(true);
  const [discountedTotalAmount, setDiscountedTotalAmount] = useState(0);
  const [liffToken, setLiffToken] = useState('');
  const total = orderTotal - discountedTotalAmount;

  useEffect(() => {
    const idToken = liff.getIDToken();
    setLiffToken(idToken)
    const getUserCarts = async () => {
      const response = await getUser(idToken, setUser)
      getCarts(response.id, setCarts, setItemsExistInCart, setRelatedProducts, setIsRendered, idToken)
    }
    getUserCarts();
  }, []);

  useEffect(() => {
    setOrderTotal(carts.reduce((cart, i) => cart + i.totalAmount, 0))
    setTotalCount(carts.reduce((cart, i) => cart + i.quantity, 0))

    // セット割商品リストからカートにある商品IDで検索をかけ、ヒットした金額の合計値を出す
    let resultRelatedProducts = [];
    carts.forEach(cart => {
      const related_product = relatedProducts.find((related_product) => related_product.related_product_id === cart.product_id)

      if (typeof related_product !== "undefined") {
        resultRelatedProducts.push(related_product)
      }
    })
    setDiscountedTotalAmount(resultRelatedProducts.reduce((relatedProduct, i) => relatedProduct + i.discount_price, 0))
  }, [carts]);

  const addCart = (e, id) => {
    const currentRelatedProduct = relatedProducts.find((relatedProduct) => (relatedProduct.related_product_id === id))
    e.preventDefault();
    const formValue = {
      product_id: id, quantity: 1, user_id: 101, 
      product: currentRelatedProduct.related_product, liffToken: liffToken
    }
    storeRelatedProdcutInCart(user.id, formValue, setCarts, carts)
    //storeRelatedProdcutInCart(101, formValue, setCarts, carts)
  }

  const deleteCartCard = (id) => {
    const newCarts = carts.filter((cart) => (cart.id !== id))
    setCarts(newCarts);
    setRelatedProducts(relatedProducts.filter((relatedProduct) => (relatedProduct.related_product_id !== id)));
    //deleteCart(101, id)
    deleteCart(user.id, id, liffToken)

    if (newCarts.length == 0) {
      setItemsExistInCart(false);
    }
  }

  const moveCheckout = () => {
    history.push({
      pathname: Paths.LiffCheckout.path,
      state: { page: 'checkout' }
    })
  };

  const CartItem = (props) => {
    const { id, product_id, quantity, product, isSalePeriod } = props;
    const link = Paths.LiffProductDetail.path.replace(':id', product_id);
    const discount_rate_decimal = product.product_sale.discount_rate / 100.0
    const sale_price = product.price - (product.price * discount_rate_decimal)

    const calculateQuantity = (id, change) => {
      const isSalePeriodResult = isSalePeriod(product.product_sale.start_date, product.product_sale.end_date)
      const targetCart = carts.find((cart) => (cart.id === id));
      change == 'increase' ? targetCart.quantity += 1 : targetCart.quantity -= 1
      targetCart.totalAmount = isSalePeriodResult ? Math.floor(sale_price) * targetCart.quantity : targetCart.product.price * targetCart.quantity;
      setCarts(carts.map((cart) => (cart.id === id ? targetCart : cart)));
      //updateCart(102, id, targetCart, location)
      targetCart.liffToken = liffToken
      updateCart(user.id, id, targetCart, location)
    }

    const getImages = (image) => {
      if (image) {
        return image.image_path
      } else {
        return noImage;
      }
    }

    return (
      <ListGroup.Item className="bg-transparent py-3 px-0">
        <Row className="">
          <Col xs="5">
            <div className="liff-cart-img">
              <Image rounded src={getImages(product.product_images[0])} className="m-0" />
            </div>
          </Col>
          <Col xs="7" className="px-0 m-0">
            <Link to={link}>
              <h4 className="fs-6 text-dark mb-0">{product.name}</h4>
            </Link>
            <h4 className="liff-product-detail-price mt-2">
              {
                isSalePeriod(product.product_sale.start_date, product.product_sale.end_date) ? (
                  `￥${Math.floor(sale_price).toLocaleString()}`
                ) : (
                  `￥${product.price.toLocaleString()}`
                )
              }
              <span>税込</span>
            </h4>
            {/* <p className="mt-3">{product.stock_quantity > 0 ? '在庫あり' : '在庫なしのため、商品をカートから削除してください'}</p> */}
          </Col>
        </Row>
        <Row className="mt-3 align-items-center">
          <Col xs="5">
            <InputGroup className="liff-cart-change-quantity">
              {(() => {
                if (quantity >= 2) {
                  return (
                    <InputGroup.Text onClick={() => calculateQuantity(id, 'decrease')}>
                      <MinusIcon className="icon icon-xs" />
                    </InputGroup.Text>
                  )
                } else {
                  return (
                    <InputGroup.Text onClick={() => deleteCartCard(id)}>
                      <TrashIcon className="icon icon-xs" />
                    </InputGroup.Text>
                  )
                }
              })()}
              <span className="form-control">{quantity}</span>
              <InputGroup.Text onClick={() => calculateQuantity(id, 'increase')}>
                <PlusIcon className="icon icon-xs" />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs="7" className="">
            <Button variant="danger" size="sm" className="me-1" onClick={() => deleteCartCard(id)}>削除</Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return isRendered ? (
    <>
      {(() => {
        if (itemsExistInCart) {
          return (
            <>
              <div className="mx-3 mt-3">
                <Card border="0" className="shadow">
                  <Card.Header className="bg-primary text-white px-3 py-2">
                    <h5 className="mb-0 fw-bolder">カートに入っている商品：{totalCount}点</h5>
                  </Card.Header>
                  <Card.Body className="py-0">
                    <ListGroup className="list-group-flush">
                      {carts.map(cart => <CartItem key={`cart-${cart.id}`} {...cart} isSalePeriod={isSalePeriod} />)}
                    </ListGroup>
                  </Card.Body>
                </Card>
                {relatedProducts.length > 0 && <LiffCartSlideCard relatedProducts={relatedProducts} addCart={addCart} />}
                <div className="p-4 pt-3 pb-0">
                  <Row className="">
                    <Col xs="8" className="px-0">
                      <div className="m-1">
                        <h4 className="fs-6 text-dark mb-0">商品合計</h4>
                        <h4 className="fs-6 text-dark mb-0 mt-2">セット商品割引</h4>
                        <h3 className="text-dark mb-0 mt-2 liff-pay-total-title">お支払い金額（税込）</h3>
                      </div>
                    </Col>
                    <Col className="p-0">
                      <div className="m-1 text-end">
                        <h4 className="fs-6 text-dark mb-0">￥ {orderTotal.toLocaleString()}</h4>
                        {
                          discountedTotalAmount ?
                            <h4 className="fs-6 text-dark mb-0 mt-2 liff-pay-discount">- ￥ {discountedTotalAmount.toLocaleString()}</h4>
                            :
                            <h4 className="fs-6 text-dark mb-0 mt-2">￥ 0</h4>
                        }
                        <h3 className="text-dark mb-0 mt-2 liff-pay-total">￥ {total.toLocaleString()}</h3>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
                  <Button as={Link} to={Paths.LiffProducts.path} variant="gray-800" className="mt-2 liff-product-detail-button">
                    <InboxIcon className="icon icon-xs me-2" />
                    他の商品を見る
                  </Button>
                  <Button onClick={moveCheckout} variant="tertiary" className="mt-2 liff-product-detail-button">
                    <ShoppingCartIcon className="icon icon-xs me-2" />
                    ご購入の手続き
                  </Button>
                </div>
              </div>
            </>
          )
        } else {
          return (
            <Card border="0" className="shadow">
              <Card.Body className="p-3">
                <h2 className="fs-5 fw-bold mb-0">カートに商品がありません。</h2>
                <Button as={Link} to={Paths.LiffProducts.path} variant="gray-800" className="mt-3">
                  <InboxIcon className="icon icon-xs me-2" />
                  他の商品を見る
                </Button>
              </Card.Body>
            </Card>
          )
        }
      })()}
    </>
  ) : (
    <>
      {(() => {
        if (itemsExistInCart) {
          return (
            <>
              <div className="mx-3 mt-3">
                <Card border="0" className="shadow">
                  <Card.Header className="bg-primary text-white px-3 py-2">
                    <ContentLoader
                      height={26}
                      width={'100%'}
                      backgroundColor={'#6e6e6e'}
                      foregroundColor={'#999'}
                    >
                      <rect x="0" y="0" rx="4" ry="4" width={'100%'} height='26' />
                    </ContentLoader>
                  </Card.Header>
                  <Card.Body className="py-0">
                    <ContentLoader
                      height={210}
                      width={'100%'}
                      backgroundColor={'#6e6e6e'}
                      foregroundColor={'#999'}
                    >
                      <rect x="0" y="20" rx="4" ry="4" width={120} height='120' />
                      <rect x="130" y="20" rx="4" ry="4" width='170' height='26' />
                      <rect x="130" y="114" rx="4" ry="4" width='120' height='26' />
                      <rect x="130" y="155" rx="4" ry="4" width='60' height='35' />
                      <rect x="0" y="155" rx="4" ry="4" width='120' height='35' />
                    </ContentLoader>
                  </Card.Body>
                </Card>
                <div className="mt-4">
                  <div className="d-flex align-items-center">
                    <h2 className="fs-6 fw-bold mb-0">合わせてお得にご購入いただけます</h2>
                  </div>
                  <div className="d-flex gap-3">
                    <Card className="p-0 mt-3" style={{ 'minWidth': 160 }}>
                      <ContentLoader
                        height={120}
                        width={160}
                        backgroundColor={'#6e6e6e'}
                        foregroundColor={'#999'}
                      >
                        <rect x="0" y="0" rx="4" ry="4" width={159} height='120' />
                      </ContentLoader>
                      <Card.Body className="p-3 px-2">
                        <ContentLoader
                          height={120}
                          width={'100%'}
                          backgroundColor={'#6e6e6e'}
                          foregroundColor={'#999'}
                        >
                          <rect x="0" y="0" rx="4" ry="4" width={'100%'} height='20' />
                          <rect x="0" y="30" rx="4" ry="4" width={'70%'} height='20' />
                          <rect x="0" y="60" rx="4" ry="4" width={'70%'} height='20' />
                          <rect x="0" y="90" rx="4" ry="4" width={'70%'} height='20' />
                        </ContentLoader>
                        <Button variant="tertiary" className="mt-3 w-100">
                          追加
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card className="p-0 mt-3" style={{ 'minWidth': 160 }}>
                      <ContentLoader
                        height={120}
                        width={160}
                        backgroundColor={'#6e6e6e'}
                        foregroundColor={'#999'}
                      >
                        <rect x="0" y="0" rx="4" ry="4" width={159} height='120' />
                      </ContentLoader>
                      <Card.Body className="p-3 px-2">
                        <ContentLoader
                          height={120}
                          width={'100%'}
                          backgroundColor={'#6e6e6e'}
                          foregroundColor={'#999'}
                        >
                          <rect x="0" y="0" rx="4" ry="4" width={'100%'} height='20' />
                          <rect x="0" y="30" rx="4" ry="4" width={'70%'} height='20' />
                          <rect x="0" y="60" rx="4" ry="4" width={'70%'} height='20' />
                          <rect x="0" y="90" rx="4" ry="4" width={'70%'} height='20' />
                        </ContentLoader>
                        <Button variant="tertiary" className="mt-3 w-100">
                          追加
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card className="p-0 mt-3" style={{ 'minWidth': 160 }}>
                      <ContentLoader
                        height={120}
                        width={160}
                        backgroundColor={'#6e6e6e'}
                        foregroundColor={'#999'}
                      >
                        <rect x="0" y="0" rx="4" ry="4" width={159} height='120' />
                      </ContentLoader>
                      <Card.Body className="p-3 px-2">
                        <ContentLoader
                          height={120}
                          width={'100%'}
                          backgroundColor={'#6e6e6e'}
                          foregroundColor={'#999'}
                        >
                          <rect x="0" y="0" rx="4" ry="4" width={'100%'} height='20' />
                          <rect x="0" y="30" rx="4" ry="4" width={'70%'} height='20' />
                          <rect x="0" y="60" rx="4" ry="4" width={'70%'} height='20' />
                          <rect x="0" y="90" rx="4" ry="4" width={'70%'} height='20' />
                        </ContentLoader>
                        <Button variant="tertiary" className="mt-3 w-100">
                          追加
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <div className="p-4 pt-3 pb-0">
                  <ContentLoader
                    height={120}
                    width={'100%'}
                    backgroundColor={'#6e6e6e'}
                    foregroundColor={'#999'}
                  >
                    <rect x="0" y="0" rx="4" ry="4" width={'30%'} height='25' />
                    <rect x={"70%"} y="0" rx="4" ry="4" width={'30%'} height='25' />
                    <rect x="0" y="40" rx="4" ry="4" width={'50%'} height='25' />
                    <rect x={"70%"} y="40" rx="4" ry="4" width={'30%'} height='25' />
                    <rect x="0" y="80" rx="4" ry="4" width={'50%'} height='25' />
                    <rect x={"70%"} y="80" rx="4" ry="4" width={'30%'} height='25' />
                  </ContentLoader>
                </div>
                <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
                  <Button as={Link} to={Paths.LiffProducts.path} variant="gray-800" className="mt-2 liff-product-detail-button">
                    <InboxIcon className="icon icon-xs me-2" />
                    他の商品を見る
                  </Button>
                  <Button onClick={moveCheckout} variant="tertiary" className="mt-2 liff-product-detail-button">
                    <ShoppingCartIcon className="icon icon-xs me-2" />
                    ご購入の手続き
                  </Button>
                </div>
              </div>
            </>
          )
        } else {
          return (
            <Card border="0" className="shadow">
              <Card.Body className="p-3">
                <h2 className="fs-5 fw-bold mb-0">カートに商品がありません。</h2>
                <Button as={Link} to={Paths.LiffProducts.path} variant="gray-800" className="mt-3">
                  <InboxIcon className="icon icon-xs me-2" />
                  他の商品を見る
                </Button>
              </Card.Body>
            </Card>
          )
        }
      })()}
    </>
  )
};
