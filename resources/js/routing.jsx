import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { Paths } from "@/paths";

// pages
import SignIn from "@/pages/auth/Signin"
import DashboardOverview from "@/pages/dashboard/DashboardOverview"
import Users from '@/pages/user/Users';
import EditUser from '@/pages/user/EditUser';
import SendSegments from '@/pages/message/SendSegments';
import Messages from '@/pages/message/TemplateMessages';
import CreateMessage from '@/pages/message/CreateTemplateMessage';
import SendHistoryDetail from '@/pages/message/SendHistoryDetail';
import SendHistories from '@/pages/message/SendHistories';
import VisirotHistories from '@/pages/visitor/VisirotHistories';
import Privileges from '@/pages/privilege/Privileges';
import Products from '@/pages/product/Products';
import Coupons from '@/pages/coupon/Coupons';
import CreateCoupon from '@/pages/coupon/CreateCoupon';
import Orders from '@/pages/order/Orders';
import Reserves from '@/pages/reserve/Reserves';
import EventCalendar from '@/pages/event/EventCalendar';
import Events from '@/pages/event/Events';
import ScheduleCalendar from '@/pages/schedule/ScheduleCalendar';
import Schedules from '@/pages/schedule/Schedules';
import Invitations from '@/pages/invitation/Invitations';
import PrivacyPolicy from '@/pages/setting/PrivacyPolicy';
import TermsOfService from '@/pages/setting/TermsOfService';
import SpecificTrades from '@/pages/setting/SpecificTrades';
import Tags from '@/pages/tag/Tags';
import QrCode from '@/pages/qrcode/QrCode';
import NotFound from '@/pages/error/NotFound';


// components
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

const Routing = () => {
  return (
    <Switch>
      <Route exact path={Paths.Signin.path} component={SignIn} />
      <RouteWithSidebar exact path={Paths.DashboardOverview.path} component={DashboardOverview} />
      <RouteWithSidebar exact path={Paths.Users.path} component={Users} />
      <RouteWithSidebar exact path={Paths.EditUser.path} component={EditUser} />
      <RouteWithSidebar exact path={Paths.SendSegments.path} component={SendSegments} />
      <RouteWithSidebar exact path={Paths.TemplateMessages.path} component={Messages} />
      <RouteWithSidebar exact path={Paths.CreateMessage.path} component={CreateMessage} />
      <RouteWithSidebar exact path={Paths.EditMessage.path} component={CreateMessage} />
      <RouteWithSidebar exact path={Paths.SendHistories.path} component={SendHistories} />
      <RouteWithSidebar exact path={Paths.SendHistoryDetail.path} component={SendHistoryDetail} />
      <RouteWithSidebar exact path={Paths.VisitorHistories.path} component={VisirotHistories} />
      <RouteWithSidebar exact path={Paths.Privileges.path} component={Privileges} />
      <RouteWithSidebar exact path={Paths.Products.path} component={Products} />
      <RouteWithSidebar exact path={Paths.Coupons.path} component={Coupons} />
      <RouteWithSidebar exact path={Paths.CreateCoupon.path} component={CreateCoupon} />
      <RouteWithSidebar exact path={Paths.Orders.path} component={Orders} />
      <RouteWithSidebar exact path={Paths.Reserves.path} component={Reserves} />
      <RouteWithSidebar exact path={Paths.EventCalendar.path} component={EventCalendar} />
      <RouteWithSidebar exact path={Paths.Events.path} component={Events} />
      <RouteWithSidebar exact path={Paths.ScheduleCalendar.path} component={ScheduleCalendar} />
      <RouteWithSidebar exact path={Paths.Schedules.path} component={Schedules} />
      <RouteWithSidebar exact path={Paths.Invitations.path} component={Invitations} />
      <RouteWithSidebar exact path={Paths.PrivacyPolicy.path} component={PrivacyPolicy} />
      <RouteWithSidebar exact path={Paths.TermsOfService.path} component={TermsOfService} />
      <RouteWithSidebar exact path={Paths.SpecificTrades.path} component={SpecificTrades} />
      <RouteWithSidebar exact path={Paths.Tags.path} component={Tags} />
      <RouteWithSidebar exact path={Paths.QrCode.path} component={QrCode} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routing;