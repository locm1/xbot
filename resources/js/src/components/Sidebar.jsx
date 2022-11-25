
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { CSSTransition } from 'react-transition-group';
import { ArchiveIcon, CalendarIcon, ChartBarIcon, ChartPieIcon, ChevronRightIcon, ClipboardListIcon, CogIcon, CreditCardIcon, InboxIcon, InformationCircleIcon, LocationMarkerIcon, NewspaperIcon, TableIcon, TemplateIcon, UsersIcon, ViewGridIcon, XIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Nav, Badge, Image, Button, Dropdown, Navbar, Collapse, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import Logo from "@img/img/logo_admin.png";
import ReactHero from "@img/img/technologies/react-hero-logo.svg";
import ProfilePicture from "@img/img/team/profile-picture-3.jpg";

import GroupTitle from "@/components/GroupTitle";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const [collapsedItems, setCollapsedItems] = useState([pathname]);
  const contracted = props.contracted ? "contracted" : "";
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);
  const onMouseEnter = () => props.onMouseEnter && props.onMouseEnter();
  const onMouseLeave = () => props.onMouseLeave && props.onMouseLeave();

  const onNavItemCollapse = (itemKey) => {
    const isCollapsed = collapsedItems.some(item => item.includes(itemKey));
    const newCollapsedItems = isCollapsed ? collapsedItems.filter(item => !item.includes(itemKey)) : [...collapsedItems, itemKey];
    setCollapsedItems(newCollapsedItems);
  };

  const events = isMobile ? {} : { onMouseEnter, onMouseLeave };

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon: NavItemIcon, children = null } = props;
    const isOpened = collapsedItems.some(item => item.includes(eventKey));

    return (
      <Nav.Item>
        <Nav.Link
          onClick={() => onNavItemCollapse(eventKey)}
          aria-expanded={isOpened}
          aria-controls={eventKey}
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <span className="sidebar-icon">
              <NavItemIcon className="icon icon-xs me-2" />
            </span>
            <span className="sidebar-text">
              {title}
            </span>
          </span>
          <span className="link-arrow">
            <ChevronRightIcon className="icon icon-sm" />
          </span>
        </Nav.Link>
        <Collapse in={isOpened} className="multi-level">
          <div id={eventKey}>
            {children}
          </div>
        </Collapse>
      </Nav.Item>
    );
  };

  const NavItem = (props) => {
    const { title, link, target, icon: NavItemIcon, image, badgeText, badgeBg, badgeColor = "white" } = props;
    const classNames = badgeText ? "d-flex align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link as={Link} to={link} target={target} className={classNames}>
          <span>
            {NavItemIcon && (
              <span className="sidebar-icon">
                <NavItemIcon className="icon icon-xs me-2" />
              </span>
            )}

            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            {!show && contracted && !NavItemIcon && !image ? (
              <span className="sidebar-text-contracted">
                {title[0]}
              </span>
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>

          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-sm notification-count">
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar as={Col} xs={12} expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-lg-none">
        <Navbar.Brand as={Link} to={Paths.DashboardOverview.path} className="me-lg-5">
          <Image src={ReactHero} className="navbar-brand-dark" />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Navbar.Toggle as={Button} onClick={onCollapse}>
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>
        </div>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar {...events} className={`${contracted} ${showClass} sidebar d-lg-block bg-gray-800 text-white collapse`}>
          <div className="sidebar-inner px-4 ptVolt Pro React-3">
            <div className="user-card d-flex d-md-none justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="avatar-lg me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h5 className="mb-3">Hi, Jane</h5>
                  <Button as={Link} variant="secondary" size="sm" to={Paths.Signin.path} className="d-inline-flex align-items-center">
                    <LogoutIcon className="icon icon-xxs me-1" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <XIcon className="icon icon-xs" />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <Image src={Logo} className="navbar-brand-dark navbar-logo-wrap" />

              {/* <GroupTitle name="User Management" /> */}

              <CollapsableNavItem eventKey="dashboard/" title="Dashboard" icon={ChartBarIcon}>
                <NavItem title="Overview" link={Paths.DashboardOverview.path} />
                <NavItem title="All Traffic" link={Paths.DashboardTraffic.path} />
                <NavItem title="Product Analysis" link={Paths.DashboardProductAnalysis.path} />
              </CollapsableNavItem>

              <NavItem title="Kanban" icon={ViewGridIcon} link={Paths.Kanban.path} />
              <NavItem title="Messages" icon={InboxIcon} badgeText="4" badgeBg="danger" link={Paths.Messages.path} />
              <NavItem title="Users List" icon={UsersIcon} link={Paths.Users.path} />
              <NavItem title="Transactions" icon={CreditCardIcon} link={Paths.Transactions.path} />
              <NavItem title="Task List" icon={ClipboardListIcon} link={Paths.Tasks.path} />
              <NavItem title="Settings" icon={CogIcon} link={Paths.Settings.path} />
              <NavItem title="Calendar" icon={CalendarIcon} link={Paths.Calendar.path} />
              <NavItem title="Map" icon={LocationMarkerIcon} link={Paths.Map.path} />
              <NavItem title="Widgets" icon={TemplateIcon} link={Paths.Widgets.path} />

              <CollapsableNavItem eventKey="tables/" title="Tables" icon={TableIcon}>
                <NavItem title="DataTables" link={Paths.Datatables.path} />
                <NavItem title="Bootstrap Tables" link={Paths.BootstrapTables.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={NewspaperIcon}>
                <NavItem title="Pricing" link={Paths.Pricing.path} />
                <NavItem title="Billing" link={Paths.Billing.path} />
                <NavItem title="Invoice" link={Paths.Invoice.path} />
                <NavItem title="Sign In" link={Paths.Signin.path} />
                <NavItem title="Sign Up" link={Paths.Signup.path} />
                <NavItem title="Forgot password" link={Paths.ForgotPassword.path} />
                <NavItem title="Reset password" link={Paths.ResetPassword.path} />
                <NavItem title="Lock" link={Paths.Lock.path} />
                <NavItem title="404 Not Found" link={Paths.NotFound.path} />
                <NavItem title="500 Server Error" link={Paths.ServerError.path} />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />

              <CollapsableNavItem eventKey="documentation/" title="Getting Started" icon={InformationCircleIcon}>
                <NavItem title="Overview" link={Paths.DocsOverview.path} />
                <NavItem title="Download" link={Paths.DocsDownload.path} />
                <NavItem title="Quick Start" link={Paths.DocsQuickStart.path} />
                <NavItem title="License" link={Paths.DocsLicense.path} />
                <NavItem title="Folder Structure" link={Paths.DocsFolderStructure.path} />
                <NavItem title="Build Tools" link={Paths.DocsBuild.path} />
                <NavItem title="Changelog" link={Paths.DocsChangelog.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="components/" title="Components" icon={ArchiveIcon}>
                <NavItem title="Accordion" link={Paths.Accordions.path} />
                <NavItem title="Alerts" link={Paths.Alerts.path} />
                <NavItem title="Badges" link={Paths.Badges.path} />
                <NavItem title="Breadcrumbs" link={Paths.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Paths.Buttons.path} />
                <NavItem title="Forms" link={Paths.Forms.path} />
                <NavItem title="Modals" link={Paths.Modals.path} />
                <NavItem title="Navbars" link={Paths.Navbars.path} />
                <NavItem title="Navs" link={Paths.Navs.path} />
                <NavItem title="Pagination" link={Paths.Pagination.path} />
                <NavItem title="Popovers" link={Paths.Popovers.path} />
                <NavItem title="Progress" link={Paths.Progress.path} />
                <NavItem title="Tables" link={Paths.Tables.path} />
                <NavItem title="Tabs" link={Paths.Tabs.path} />
                <NavItem title="Toasts" link={Paths.Toasts.path} />
                <NavItem title="Tooltips" link={Paths.Tooltips.path} />
                <NavItem title="Widgets" link={Paths.WidgetsComponent.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="plugins/" title="Plugins" icon={ChartPieIcon}>
                <NavItem title="Charts" link={Paths.PluginCharts.path} />
                <NavItem title="Calendar" link={Paths.PluginCalendar.path} />
                <NavItem title="DataTable" link={Paths.PluginDatatable.path} />
                <NavItem title="Map" link={Paths.PluginMap.path} />
                <NavItem title="DropZone" link={Paths.PluginDropzone.path} />
                <NavItem title="SweetAlert" link={Paths.PluginSweetAlert.path} />
              </CollapsableNavItem>

            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
