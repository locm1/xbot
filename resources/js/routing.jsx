import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Paths } from "@/paths";
import { getPages, updatePages } from "@/pages/sidebar/api/PageApiMethods";

// page
import SignIn from "@/pages/auth/Signin"
import DashboardOverview from "@/pages/dashboard/DashboardOverview"
import CreateQuestionnaire from '@/pages/questionnaire/CreateQuestionnaire';
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
import Invitations from '@/pages/invitation/Invitations';
import EditInvitation from '@/pages/invitation/EditInvitation';
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
import LiffPrivacyPolicy from '@/pages/liff/LiffPrivacyPolicy';
import LiffTermsOfService from '@/pages/liff/LiffTermsOfService';
import LiffSpecificTrades from '@/pages/liff/LiffSpecificTrades';
import LiffVisitor from '@/pages/liff/visitor/LiffVisitor';
import LiffAboutVisitorPrivileges from '@/pages/liff/visitor/LiffAboutVisitorPrivileges';
import LiffEventReservations from '@/pages/liff/event/LiffEventReservations';
import LiffQuestionnaire from '@/pages/liff/questionnaire/LiffQuestionnaire';
import LiffQuestionnaireComplete from '@/pages/liff/questionnaire/LiffQuestionnaireComplete';
import LiffProductHistories from '@/pages/liff/history/LiffProductHistories';
import LiffProductHistoryDetail from '@/pages/liff/history/LiffProductHistoryDetail';
import LiffInvite from '@/pages/liff/invite/LiffInvite';

// components
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';


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

  useEffect(() => {
    getPages(setPages)

    axios.get('/api/v1/management/me').then(response => {
      setAdmin(response.data.admin);
      setLoading(false)
    }).catch(error => {
      console.error(error);
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
                <main className="content">
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
  return (
    <Switch>
      <GuestRoute exact path={Paths.Signin.path} component={SignIn} />
      <Route exact path='/'>
        {<Redirect to={Paths.DashboardOverview.path} />}
      </Route>
      <RouteWithSidebar exact role_path="dashboard" path={Paths.DashboardOverview.path} component={DashboardOverview} role={3} />
      <RouteWithSidebar exact role_path="questionnaire" path={Paths.CreateQuestionnaire.path} component={CreateQuestionnaire} />
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
      <RouteWithSidebar exact role_path="invitation" path={Paths.Invitations.path} component={Invitations} />
      <RouteWithSidebar exact role_path="invitation" path={Paths.EditInvitation.path} component={EditInvitation} />
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
        
      <LiffRoute exact path={Paths.LiffProductDetail.path} component={LiffProductDetail} />
      <LiffRoute exact path={Paths.LiffProducts.path} component={LiffProducts} />
      <LiffRoute exact path={Paths.LiffProductCategories.path} component={LiffProductCategories} />
      <LiffRoute exact path={Paths.LiffCarts.path} component={LiffCarts} />
      <LiffRoute exact path={Paths.LiffCheckout.path} component={LiffCheckout} />
      <LiffRoute exact path={Paths.LiffCheckoutDestinations.path} component={LiffCheckoutAddress} />
      <LiffRoute exact path={Paths.LiffCheckoutAddress.path} component={LiffCheckoutAddAddress} />
      <LiffRoute exact path={Paths.LiffCheckoutDelivery.path} component={LiffCheckoutDelivery} />
      <LiffRoute exact path={Paths.LiffCheckoutPayment.path} component={LiffCheckoutPaymentSelect} />
      <LiffRoute exact path={Paths.LiffCheckoutPaymentCreditCard.path} component={LiffCheckoutPaymentCreditCard} />
      <LiffRoute exact path={Paths.LiffPrivacyPolicy.path} component={LiffPrivacyPolicy} />
      <LiffRoute exact path={Paths.LiffTermsOfService.path} component={LiffTermsOfService} />
      <LiffRoute exact path={Paths.LiffSpecificTrades.path} component={LiffSpecificTrades} />
      <LiffRoute exact path={Paths.LiffVisitor.path} component={LiffVisitor} />
      <LiffRoute exact path={Paths.LiffAboutVisitorPrivileges.path} component={LiffAboutVisitorPrivileges} />
      <LiffRoute exact path={Paths.LiffEventReservations.path} component={LiffEventReservations} />
      <LiffRoute exact path={Paths.LiffQuestionnaire.path} component={LiffQuestionnaire} />
      <LiffRoute exact path={Paths.LiffQuestionnaireComplete.path} component={LiffQuestionnaireComplete} />
      <LiffRoute exact path={Paths.LiffProductHistories.path} component={LiffProductHistories} />
      <LiffRoute exact path={Paths.LiffProductHistoryDetail.path} component={LiffProductHistoryDetail} />
      <LiffRoute exact path={Paths.LiffInvite.path} component={LiffInvite} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routing;