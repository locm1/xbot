import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Paths } from "@/paths";

// pages
import SignIn from "@/pages/auth/Signin"
import DashboardOverview from "@/pages/dashboard/DashboardOverview"
import Users from '@/pages/Users';
import Messages from '@/pages/TemplateMessages';
import SendHistories from '@/pages/SendHistories';
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
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routing;