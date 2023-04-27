import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation, Link } from "react-router-dom";
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { LiffMockPlugin } from '@line/liff-mock';
import { getPages, updatePages } from "@/pages/sidebar/api/PageApiMethods";
import { generateEnv } from '@/components/common/GenerateEnv';
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showQuestionnaireEnabling } from "@/pages/liff/api/QuestionnaireApiMethods";

// page
import SignIn from "@/pages/auth/Signin"
import DashboardOverview from "@/pages/dashboard/DashboardOverview"
import CreateQuestionnaire from '@/pages/questionnaire/CreateQuestionnaire';
import DefaultQuestionnaire from '@/pages/questionnaire/DefaultQuestionnaire';
import Users from '@/pages/user/Users';
import EditUser from '@/pages/user/EditUser';
import SendSegments from '@/pages/message/SendSegments';
import Messages from '@/pages/message/TemplateMessages';
import CreateMessage from '@/pages/message/CreateTemplateMessage';
import SendHistoryDetail from '@/pages/message/SendHistoryDetail';
import SendHistories from '@/pages/message/SendHistories';
import VisitorHistories from '@/pages/visitor/VisitorHistories';
import EditVisitorHistory from '@/pages/visitor/EditVisitorHistory';
import Privileges from '@/pages/privilege/Privileges';
import Payment from '@/pages/payment/Payment';
import Environment from '@/pages/product/Environment';
import Products from '@/pages/product/Products';
import ProductCategory from '@/pages/product/ProductCategory';
import EditCategory from '@/pages/product/EditCategory'
import EditProduct from '@/pages/product/EditProduct';
import OrderDetail from '@/pages/order/OrderDetail';
import Coupons from '@/pages/coupon/Coupons';
import CreateCoupon from '@/pages/coupon/CreateCoupon';
import Orders from '@/pages/order/Orders';
import Reserves from '@/pages/reserve/Reserves';
import EventCalendar from '@/pages/event/EventCalendar';
import Events from '@/pages/event/Events';
import InviteIncentives from '@/pages/invitation/InviteIncentives';
import EditInviteIncentive from '@/pages/invitation/EditInviteIncentive';
import InviterIncentives from '@/pages/invitation/InviterIncentives';
import InviteeIncentives from '@/pages/invitation/InviteeIncentives';
import PrivacyPolicy from '@/pages/setting/PrivacyPolicy';
import TermsOfService from '@/pages/setting/TermsOfService';
import SpecificTrades from '@/pages/setting/specific_trades/SpecificTrades';
import Tags from '@/pages/tag/Tags';
import QrCode from '@/pages/qrcode/QrCode';
import NotFound from '@/pages/error/NotFound';
import Api from '@/pages/api_key/createApi';
import Greeting from '@/pages/greeting/Greeting';
import RichMenu from '@/pages/richmenu/RichMenu';
import RichMenus from '@/pages/richmenu/RichMenus';
import Postage from '@/pages/master/Postage';
import Permissions from '@/pages/sidebar/Permissions';
import InflowRoute from '@/pages/inflow_route/InflowRoute';

// Account
import Accounts from '@/pages/account/Accounts';
import EditAccount from '@/pages/account/EditAccount';

// LIFF pages
import LiffProductDetail from '@/pages/liff/detail/LiffProductDetail';
import LiffProducts from '@/pages/liff/LiffProducts';
import LiffProductCategories from '@/pages/liff/LiffProductCategories';
import LiffCarts from '@/pages/liff/cart/LiffCarts';
import LiffCheckout from '@/pages/liff/checkout/LiffCheckout';
import LiffCheckoutAddress from '@/pages/liff/checkout/LiffCheckoutAddress';
import LiffCheckoutAddAddress from '@/pages/liff/checkout/LiffCheckoutAddAddress';
import LiffCheckoutDelivery from '@/pages/liff/checkout/LiffCheckoutDelivery';
import LiffCheckoutPaymentSelect from '@/pages/liff/checkout/LiffCheckoutPaymentSelect';
import LiffCheckoutPaymentCreditCard from '@/pages/liff/checkout/LiffCheckoutPaymentCreditCard';
import LIffCheckoutAddCoupon from '@/pages/liff/checkout/LIffCheckoutAddCoupon';
import LiffPrivacyPolicy from '@/pages/liff/LiffPrivacyPolicy';
import LiffTermsOfService from '@/pages/liff/LiffTermsOfService';
import LiffSpecificTrades from '@/pages/liff/LiffSpecificTrades';
import LiffVisitor from '@/pages/liff/visitor/LiffVisitor';
import LiffVisitorConfirm from '@/pages/liff/visitor/LiffVisitorConfirm';
import LiffVisitorHistoryAdd from '@/pages/liff/visitor/LiffVisitorHistoryAdd';
import LiffAboutVisitorPrivileges from '@/pages/liff/visitor/LiffAboutVisitorPrivileges';
import LiffEventReservations from '@/pages/liff/event/LiffEventReservations';
import LiffAlreadyQuestionnaire from '@/pages/liff/questionnaire/LiffAlreadyQuestionnaire';
import LiffQuestionnaire from '@/pages/liff/questionnaire/LiffQuestionnaire';
import LiffQuestionnaireComplete from '@/pages/liff/questionnaire/LiffQuestionnaireComplete';
import LiffProductHistories from '@/pages/liff/history/LiffProductHistories';
import LiffProductHistoryDetail from '@/pages/liff/history/LiffProductHistoryDetail';
import LiffInvite from '@/pages/liff/invite/LiffInvite';
import OrderComplete from '@/pages/liff/order/OrderComplete';
import LiffProductReservationComplete from '@/pages/liff/product_reservation/ProductReservationComplete';
import LiffFriendAdd from '@/pages/liff/friend/LiffFriendAdd';
import LiffInflowRoute from '@/pages/liff/inflow_route/InflowRoute';
import LiffServerError from '@/pages/error/InternalServerError';

// components
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import axios from 'axios';
import { Button, Card, Stack } from 'react-bootstrap';

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const resize = () => {
    var resize = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
    setTimeout(function () {
      clearInterval(resize);
    }, 301);
  }

  const localStorageIsContracted = () => {
    return localStorage.getItem('sidebarContracted') === 'false' ? false : true
  }

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [contracted, setContracted] = useState(localStorageIsContracted());
  const [contractSidebar, setContractSidebar] = useState(localStorageIsContracted());
  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleMouseOver = () => {
    if (contracted) {
      setContractSidebar(!contractSidebar);
    }
    resize();
  };

  const toggleContracted = () => {
    setContracted(!contracted);
    setContractSidebar(!contracted);
    localStorage.setItem('sidebarContracted', !contracted);
    resize();
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  const [admin, setAdmin] = useState(
    {id: 1, login_id: 'admin', name: '管理者用アカウン', role: ''}
  );
  const [pages, setPages] = useState([
    {role: ''}
  ]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    getPages(setPages)

    axios.get('/api/v1/management/me').then(response => {
      setAdmin(response.data.admin);
      setLoading(false)
      console.log(response.data.admin);
    }).catch(error => {
      console.error(error);
      setLoading(false)
      history.push(Paths.Signin.path);
    })
  }, [])
  
  //ログインユーザーの権限レベルに応じてページの閲覧可能かどうか判定
  const pageRole = pages && pages.filter(page => { return page.path == rest.role_path})

  return (
    <>
      {(() => {
        if (pageRole[0] && admin.role <= pageRole[0].role) {
          return(
            <>
            <Route {...rest} render={props => (
              <>
                <Sidebar
                  contracted={contractSidebar}
                  onMouseEnter={toggleMouseOver}
                  onMouseLeave={toggleMouseOver}
                  admin={admin}
                  pages={pages}
                />
                <main className="content mb-5">
                  <Topbar toggleContracted={toggleContracted} toggleSettings={toggleSettings} admin={admin} />
                  <Component {...props} />
                </main>
              </>
            )}
            />
            </>
          );
        } else {
          return (
            loading ? '' : <Route component={NotFound} />
          );
        }
      })()}
    </>
  );
};

const LiffRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <>
        <Component {...props} />
        <Footer />
      </>
    )}
    />
  );
}

const LiffECRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <>
        <ECHeader />
        <Component {...props} />
        <Footer />
      </>
    )}
    />
  );
}

const ECHeader = () => (
  <header>
    <Stack direction='horizontal'>
      <Link className='m-2' to={Paths.LiffProducts.path}>TOPページ</Link>
      <Link className='ms-auto m-2' to={Paths.LiffCarts.path}>カート</Link>
    </Stack>
  </header>
)

const RegisteredLiffRoute = ({ component: Component, ...rest }) => {
  const idToken = liff.getIDToken();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [questionnaireEnabling, setQuestionnaireEnabling] = useState({});
  useEffect(() => {
    showQuestionnaireEnabling(1, setQuestionnaireEnabling)
    getUser(idToken, setUser).finally(() => {
      setIsLoading(false);
    });
  }, []);
  
  if (isLoading) {
    // getUserの処理が完了するまでローディング画面を表示
    return <LoadingPage />;
  }

  if (questionnaireEnabling.is_default_questionnaire_enabled === 0 && questionnaireEnabling.is_questionnaire_enabled == 0) {
    return (
      <Route {...rest} render={props => (
        <>
          <Component {...props} />
          <Footer />
        </>
      )}
      />
    );
  }

  if (user.is_registered == 0) {
    // userがnullの場合はアンケート画面を出力
    return <ToQuestionnairePage />;
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Component {...props} />
        <Footer />
      </>
    )}
    />
  );
}

const QuestionnaireLiffRoute = ({ component: Component, ...rest }) => {
  const idToken = liff.getIDToken();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [questionnaireEnabling, setQuestionnaireEnabling] = useState({});
  useEffect(() => {
    showQuestionnaireEnabling(1, setQuestionnaireEnabling)
    getUser(idToken, setUser).finally(() => {
      setIsLoading(false);
    });
  }, []);
  
  if (isLoading) {
    // getUserの処理が完了するまでローディング画面を表示
    return <LoadingPage />;
  }

  if (questionnaireEnabling.is_default_questionnaire_enabled === 0 && questionnaireEnabling.is_questionnaire_enabled == 0) {
    return <LiffServerError />;
  }

  if (user.is_registered == 1) {
    // userがnullの場合はアンケート画面を出力
    return <LiffAlreadyQuestionnaire />;
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Component {...props} />
        <Footer />
      </>
    )}
    />
  );
}

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <p>Loading...</p>
    </div>
  );
}

const ToQuestionnairePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [liffId, setLiffId] = useState('');
  axios.get('/api/v1/get-liff-id')
    .then((response) => {
      setLiffId(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });

  if (isLoading) {
    // getUserの処理が完了するまでローディング画面を表示
    return <LoadingPage />;
  }
  return (
    <>
      <Card className='m-3 p-3'>
        <div className='text-center mb-3'>アンケートにお答え頂くと利用できます</div>
        <Button className='' href={`https://liff.line.me/${liffId}?path=questionnaire`}>
          回答する
        </Button>
      </Card>
      <Footer />
    </>
  )
}


const NoFooterRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <>
        <Component {...props} />
      </>
    )}
    />
  );
}

const LiffCreditCardRoute = ({ component: Component, ...rest }) => {
  const [isInit, setIsInit] = useState(false);
  axios.get('/api/v1/get-liff-id')
    .then((response) => {
      console.log(response);
      liff.init({liffId: response.data})
        .then(() => {
          if(liff.isLoggedIn() === false) liff.login()
          setIsInit(true);
        })
        .catch((err) => {
          console.log(err.code, err.message);
        });
    })
    .catch((error) => {
      console.error(error);
    })

    return isInit && (
      <Route {...rest} render={props => (
        <>
          <Component {...props} />
          <Footer />
        </>
      )}
      />
    );
}


const LiffInitRoute = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const path = query.get('path')
  const [redirect, setRedirect] = useState('');
  axios.get('/api/v1/get-liff-id')
    .then((response) => {
      console.log(response);
      liff.init({liffId: response.data})
        .then(() => {
          if(liff.isLoggedIn() === false) liff.login()
          setRedirect(path);
        })
        .catch((err) => {
          console.log(err.code, err.message);
        });
    })
    .catch((error) => {
      console.error(error);
    })


    return redirect && <Redirect to={`/${redirect}`} />
}


const GuestRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  //認証しているかどうか
  useEffect(() => {
    axios.get('/api/v1/management/me').then(response => {
      history.push(Paths.DashboardOverview.path);
    }).catch(error => {
      console.error(error);
    })
  }, []);
  return <Route {...rest} render={props => (<Component {...props} />)} />;
}


const Routing = () => {
  const history = useHistory();
  
  axios.interceptors.response.use(null, (error) => {
    console.log(error);
    if (error.response.status === 401) {
      history.push('/manage/login'); // ログイン画面にリダイレクト
    } else if (error.response.status === 422) {
      Swal.fire(
        `エラー`,
        `入力項目を確認してください。`,
        'error'
      )
    }
    return Promise.reject(error);
  });
  return (
    <Switch>
      <GuestRoute exact path={Paths.Signin.path} component={SignIn} />
      <Route exact path='/'>
        {<Redirect to={Paths.DashboardOverview.path} />}
      </Route>
      <RouteWithSidebar exact role_path="dashboard" path={Paths.DashboardOverview.path} component={DashboardOverview} role={3} />
      <RouteWithSidebar exact role_path="questionnaire" path={Paths.CreateQuestionnaire.path} component={CreateQuestionnaire} />
      <RouteWithSidebar exact role_path="questionnaire" path={Paths.DefaultQuestionnaire.path} component={DefaultQuestionnaire} />
      <RouteWithSidebar exact role_path="user" path={Paths.Users.path} component={Users} />
      <RouteWithSidebar exact role_path="user" path={Paths.EditUser.path} component={EditUser} />
      <RouteWithSidebar exact role_path="user" path={Paths.Tags.path} component={Tags} />
      <RouteWithSidebar exact role_path="message" path={Paths.SendSegments.path} component={SendSegments} />
      <RouteWithSidebar exact role_path="message" path={Paths.TemplateMessages.path} component={Messages} />
      <RouteWithSidebar exact role_path="message" path={Paths.CreateMessage.path} component={CreateMessage} />
      <RouteWithSidebar exact role_path="message" path={Paths.EditMessage.path} component={CreateMessage} />
      <RouteWithSidebar exact role_path="message" path={Paths.SendHistories.path} component={SendHistories} />
      <RouteWithSidebar exact role_path="message" path={Paths.SendHistoryDetail.path} component={SendHistoryDetail} />
      <RouteWithSidebar exact role_path="visitor" path={Paths.VisitorHistories.path} component={VisitorHistories} />
      <RouteWithSidebar exact role_path="visitor" path={Paths.EditVisitorHistory.path} component={EditVisitorHistory} />
      <RouteWithSidebar exact role_path="visitor" path={Paths.Privileges.path} component={Privileges} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Payment.path} component={Payment} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Environment.path} component={Environment} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Products.path} component={Products} />
      <RouteWithSidebar exact role_path="ec" path={Paths.ProductCategory.path} component={ProductCategory} />
      <RouteWithSidebar exact role_path="ec" path={Paths.CreateCategory.path} component={EditCategory} />
      <RouteWithSidebar exact role_path="ec" path={Paths.EditCategory.path} component={EditCategory} />
      <RouteWithSidebar exact role_path="ec" path={Paths.CreateProduct.path} component={EditProduct} />
      <RouteWithSidebar exact role_path="ec" path={Paths.EditProduct.path} component={EditProduct} />
      <RouteWithSidebar exact role_path="ec" path={Paths.OrderDetail.path} component={OrderDetail} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Coupons.path} component={Coupons} />
      <RouteWithSidebar exact role_path="ec" path={Paths.CreateCoupon.path} component={CreateCoupon} />
      <RouteWithSidebar exact role_path="ec" path={Paths.EditCoupon.path} component={CreateCoupon} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Orders.path} component={Orders} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Reserves.path} component={Reserves} />
      <RouteWithSidebar exact role_path="ec" path={Paths.PrivacyPolicy.path} component={PrivacyPolicy} />
      <RouteWithSidebar exact role_path="ec" path={Paths.TermsOfService.path} component={TermsOfService} />
      <RouteWithSidebar exact role_path="ec" path={Paths.SpecificTrades.path} component={SpecificTrades} />
      <RouteWithSidebar exact role_path="ec" path={Paths.Postage.path} component={Postage} />
      <RouteWithSidebar exact role_path="event" path={Paths.EventCalendar.path} component={EventCalendar} />
      <RouteWithSidebar exact role_path="event" path={Paths.Events.path} component={Events} />
      <RouteWithSidebar exact role_path="invitation" path={Paths.InviteIncentives.path} component={InviteIncentives} />
      <RouteWithSidebar exact role_path="invitation" path={Paths.CreateInviteIncentive.path} component={EditInviteIncentive} />
      <RouteWithSidebar exact role_path="invitation" path={Paths.EditInviteIncentive.path} component={EditInviteIncentive} />
      <RouteWithSidebar exact role_path="invitation" path={Paths.InviterIncentives.path} component={InviterIncentives} />
      <RouteWithSidebar exact role_path="invitation" path={Paths.InviteeIncentives.path} component={InviteeIncentives} />
      <RouteWithSidebar exact role_path="account" path={Paths.QrCode.path} component={QrCode} />
      <RouteWithSidebar exact role_path="account" path={Paths.Api.path} component={Api} />
      <RouteWithSidebar exact role_path="account" path={Paths.Greeting.path} component={Greeting} />
      <RouteWithSidebar exact role_path="account" path={Paths.CreateRichMenu.path} component={RichMenu} />
      <RouteWithSidebar exact role_path="account" path={Paths.EditRichMenu.path} component={RichMenu} />
      <RouteWithSidebar exact role_path="account" path={Paths.RichMenus.path} component={RichMenus} />
      <RouteWithSidebar exact role_path="account" path={Paths.Accounts.path} component={Accounts} />
      <RouteWithSidebar exact role_path="account" path={Paths.EditAccount.path} component={EditAccount} />
      <RouteWithSidebar exact role_path="account" path={Paths.RegisterAccount.path} component={EditAccount} />
      <RouteWithSidebar exact role_path="account" path={Paths.Permissions.path} component={Permissions} />
      <RouteWithSidebar exact role_path="account" path={Paths.InflowRoute.path} component={InflowRoute} />
      
      <LiffInitRoute path={Paths.LiffInit.path} />
      <LiffECRoute exact path={Paths.LiffProductDetail.path} component={LiffProductDetail} />
      <RegisteredLiffRoute exact path={Paths.LiffProductReservationComplete.path} component={LiffProductReservationComplete} />
      <LiffECRoute exact path={Paths.LiffProducts.path} component={LiffProducts} />
      <LiffECRoute exact path={Paths.LiffPickupProducs.path} component={LiffProductCategories} />
      <LiffRoute exact path={Paths.LiffCarts.path} component={LiffCarts} />
      <RegisteredLiffRoute exact path={Paths.LiffCheckout.path} component={LiffCheckout} />
      <RegisteredLiffRoute exact path={Paths.LiffCheckoutDestinations.path} component={LiffCheckoutAddress} />
      <RegisteredLiffRoute exact path={Paths.LiffCheckoutAddress.path} component={LiffCheckoutAddAddress} />
      <RegisteredLiffRoute exact path={Paths.LiffCheckoutEditAddress.path} component={LiffCheckoutAddAddress} />
      <RegisteredLiffRoute exact path={Paths.LiffCheckoutDelivery.path} component={LiffCheckoutDelivery} />
      <RegisteredLiffRoute exact path={Paths.LiffCheckoutPayment.path} component={LiffCheckoutPaymentSelect} />
      <LiffCreditCardRoute exact path={Paths.LiffCheckoutPaymentCreditCard.path} component={LiffCheckoutPaymentCreditCard} />
      <RegisteredLiffRoute exact path={Paths.LIffCheckoutAddCoupon.path} component={LIffCheckoutAddCoupon} />
      <RegisteredLiffRoute exact path={Paths.LiffOrderComplete.path} component={OrderComplete} />
      <LiffRoute exact path={Paths.LiffPrivacyPolicy.path} component={LiffPrivacyPolicy} />
      <LiffRoute exact path={Paths.LiffTermsOfService.path} component={LiffTermsOfService} />
      <LiffRoute exact path={Paths.LiffSpecificTrades.path} component={LiffSpecificTrades} />
      <RegisteredLiffRoute exact path={Paths.LiffVisitor.path} component={LiffVisitor} />
      {/* <LiffRoute exact path={Paths.LiffVisitor.path} component={LiffVisitor} /> */}
      <LiffRoute exact path={Paths.LiffVisitorConfirm.path} component={LiffVisitorConfirm} />
      <LiffRoute exact path={Paths.LiffAboutVisitorPrivileges.path} component={LiffAboutVisitorPrivileges} />
      <RegisteredLiffRoute exact path={Paths.LiffEventReservations.path} component={LiffEventReservations} />
      <RegisteredLiffRoute exact path={Paths.LiffAlreadyQuestionnaire.path} component={LiffAlreadyQuestionnaire} />
      <QuestionnaireLiffRoute exact path={Paths.LiffQuestionnaire.path} component={LiffQuestionnaire} />
      <QuestionnaireLiffRoute exact path={Paths.LiffQuestionnaireComplete.path} component={LiffQuestionnaireComplete} />
      <RegisteredLiffRoute exact path={Paths.LiffProductHistories.path} component={LiffProductHistories} />
      <RegisteredLiffRoute exact path={Paths.LiffProductHistoryDetail.path} component={LiffProductHistoryDetail} />
      <LiffRoute exact path={Paths.LiffInvite.path} component={LiffInvite} />
      <NoFooterRoute exact path={Paths.LiffFriendAdd.path} component={LiffFriendAdd} />
      <NoFooterRoute exact path={Paths.LiffVisitorHistoryAdd.path} component={LiffVisitorHistoryAdd} />
      <NoFooterRoute exact path={Paths.LiffInflowRoute.path} component={LiffInflowRoute} />
      <NoFooterRoute exact path={Paths.LiffServerError.path} component={LiffServerError} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routing;