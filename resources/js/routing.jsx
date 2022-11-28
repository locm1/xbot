import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { Paths } from "@/paths";

// pages
import SignIn from "@/pages/auth/Signin"
import DashboardOverview from "@/pages/dashboard/DashboardOverview"
import Users from '@/pages/user/Users';
import Messages from '@/pages/message/TemplateMessages';
import SendHistories from '@/pages/message/SendHistories';
import VisirotHistories from '@/pages/visitor/VisirotHistories';
import Products from '@/pages/product/Products';
import Coupons from '@/pages/coupon/Coupons';
import Orders from '@/pages/order/Orders';
import Reserves from '@/pages/reserve/Reserves';
import EventCalendar from '@/pages/event/EventCalendar';
import Events from '@/pages/event/Events';
import ScheduleCalendar from '@/pages/schedule/ScheduleCalendar';
import Schedules from '@/pages/schedule/Schedules';
import Invitations from '@/pages/invitation/Invitations';
import NotFound from '@/pages/error/NotFound';


// components
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
// import Footer from '@/components/Footer';


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
      <RouteWithSidebar exact path={Paths.TemplateMessages.path} component={Messages} />
      <RouteWithSidebar exact path={Paths.SendHistories.path} component={SendHistories} />
      <RouteWithSidebar exact path={Paths.VisitorHistories.path} component={VisirotHistories} />
      <RouteWithSidebar exact path={Paths.Products.path} component={Products} />
      <RouteWithSidebar exact path={Paths.Coupons.path} component={Coupons} />
      <RouteWithSidebar exact path={Paths.Orders.path} component={Orders} />
      <RouteWithSidebar exact path={Paths.Reserves.path} component={Reserves} />
      <RouteWithSidebar exact path={Paths.EventCalendar.path} component={EventCalendar} />
      <RouteWithSidebar exact path={Paths.Events.path} component={Events} />
      <RouteWithSidebar exact path={Paths.ScheduleCalendar.path} component={ScheduleCalendar} />
      <RouteWithSidebar exact path={Paths.Schedules.path} component={Schedules} />
      <RouteWithSidebar exact path={Paths.Invitations.path} component={Invitations} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routing;