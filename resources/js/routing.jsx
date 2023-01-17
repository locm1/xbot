import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Paths } from "@/paths";

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
import ScheduleCalendar from '@/pages/schedule/ScheduleCalendar';
import Schedules from '@/pages/schedule/Schedules';
import Invitations from '@/pages/invitation/Invitations';
import EditInvitation from '@/pages/invitation/EditInvitation';
import PrivacyPolicy from '@/pages/setting/PrivacyPolicy';
import TermsOfService from '@/pages/setting/TermsOfService';
import SpecificTrades from '@/pages/setting/SpecificTrades';
import Tags from '@/pages/tag/Tags';
import QrCode from '@/pages/qrcode/QrCode';
import NotFound from '@/pages/error/NotFound';
import Api from '@/pages/api/createApi';
import Greeting from '@/pages/greeting/Greeting';
import Display from '@/pages/display/DisplayOrderCategory';

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

// components
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';


const RouteWithSidebar = ({ component: Component, ...rest }) => {
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

  return (
    <Route {...rest} render={props => (
      <>
        <Sidebar
          contracted={contractSidebar}
          onMouseEnter={toggleMouseOver}
          onMouseLeave={toggleMouseOver}
        />

        <main className="content">
          <Topbar toggleContracted={toggleContracted} />
          <Component {...props} />
        </main>
      </>
    )}
    />
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

const Routing = () => {
  return (
    <Switch>
      <Route exact path={Paths.Signin.path} component={SignIn} />
      <Route exact path={Paths.Route.path}>
        {<Redirect to="/dashboard" />}
      </Route>
      <RouteWithSidebar exact path={Paths.DashboardOverview.path} component={DashboardOverview} />
      <RouteWithSidebar exact path={Paths.CreateQuestionnaire.path} component={CreateQuestionnaire} />
      <RouteWithSidebar exact path={Paths.Users.path} component={Users} />
      <RouteWithSidebar exact path={Paths.EditUser.path} component={EditUser} />
      <RouteWithSidebar exact path={Paths.SendSegments.path} component={SendSegments} />
      <RouteWithSidebar exact path={Paths.TemplateMessages.path} component={Messages} />
      <RouteWithSidebar exact path={Paths.CreateMessage.path} component={CreateMessage} />
      <RouteWithSidebar exact path={Paths.EditMessage.path} component={CreateMessage} />
      <RouteWithSidebar exact path={Paths.SendHistories.path} component={SendHistories} />
      <RouteWithSidebar exact path={Paths.SendHistoryDetail.path} component={SendHistoryDetail} />
      <RouteWithSidebar exact path={Paths.VisitorHistories.path} component={VisitorHistories} />
      <RouteWithSidebar exact path={Paths.EditVisitorHistory.path} component={EditVisitorHistory} />
      <RouteWithSidebar exact path={Paths.Privileges.path} component={Privileges} />
      <RouteWithSidebar exact path={Paths.Products.path} component={Products} />
      <RouteWithSidebar exact path={Paths.ProductCategory.path} component={ProductCategory} />
      <RouteWithSidebar exact path={Paths.EditCategory.path} component={EditCategory} />
      <RouteWithSidebar exact path={Paths.CreateProduct.path} component={EditProduct} />
      <RouteWithSidebar exact path={Paths.EditProduct.path} component={EditProduct} />
      <RouteWithSidebar exact path={Paths.OrderDetail.path} component={OrderDetail} />
      <RouteWithSidebar exact path={Paths.Coupons.path} component={Coupons} />
      <RouteWithSidebar exact path={Paths.CreateCoupon.path} component={CreateCoupon} />
      <RouteWithSidebar exact path={Paths.Orders.path} component={Orders} />
      <RouteWithSidebar exact path={Paths.Reserves.path} component={Reserves} />
      <RouteWithSidebar exact path={Paths.EventCalendar.path} component={EventCalendar} />
      <RouteWithSidebar exact path={Paths.Events.path} component={Events} />
      <RouteWithSidebar exact path={Paths.ScheduleCalendar.path} component={ScheduleCalendar} />
      <RouteWithSidebar exact path={Paths.Schedules.path} component={Schedules} />
      <RouteWithSidebar exact path={Paths.Invitations.path} component={Invitations} />
      <RouteWithSidebar exact path={Paths.EditInvitation.path} component={EditInvitation} />
      <RouteWithSidebar exact path={Paths.PrivacyPolicy.path} component={PrivacyPolicy} />
      <RouteWithSidebar exact path={Paths.TermsOfService.path} component={TermsOfService} />
      <RouteWithSidebar exact path={Paths.SpecificTrades.path} component={SpecificTrades} />
      <RouteWithSidebar exact path={Paths.Tags.path} component={Tags} />
      <RouteWithSidebar exact path={Paths.QrCode.path} component={QrCode} />
      <RouteWithSidebar exact path={Paths.Api.path} component={Api} />
      <RouteWithSidebar exact path={Paths.Greeting.path} component={Greeting} />
      <RouteWithSidebar exact path={Paths.Display.path} component={Display} />

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
      
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routing;