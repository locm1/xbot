import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { CSSTransition } from 'react-transition-group';
import { UserIcon, UserGroupIcon, ShoppingCartIcon, CalendarIcon, InboxIcon, ChevronRightIcon, ShoppingBagIcon, CogIcon, CurrencyYenIcon, QrcodeIcon, UserAddIcon, XIcon, PencilAltIcon, ClipboardIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Nav, Badge, Image, Button, Dropdown, Navbar, Collapse, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import Logo from "@img/img/logo_admin.png";
import ReactHero from "@img/img/technologies/react-hero-logo.svg";
import ProfilePicture from "@img/img/team/profile-picture-3.jpg";

import GroupTitle from "@/components/GroupTitle";
import { StoreIcon, GiftIcon } from "@/components/icons/Icons";
import { stringify } from "postcss";

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
    const [isOpened, setOpen] = useState(Boolean(~pathname.indexOf(eventKey)));
    return (
      <Nav.Item>
        <Nav.Link
          onClick={() => setOpen(!isOpened)}
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
        <SimpleBar {...events} className={`${contracted} ${showClass} sidebar d-lg-block bg-gray-800 text-white collapse pb-8`}>
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
              <Link to={Paths.DashboardOverview.path}>
                <Image src={Logo} className="navbar-brand-dark navbar-logo-wrap" />
              </Link>
              {/* <GroupTitle name="User Management" /> */}
              <NavItem title="ダッシュボード" link={Paths.DashboardOverview.path} icon={ClipboardIcon} />

              <CollapsableNavItem eventKey="user/" title="顧客管理" icon={UserIcon}>
                <NavItem title="ユーザーリスト" link={Paths.Users.path} />
                <NavItem title="タグ設定" link={Paths.Tags.path} />
              </CollapsableNavItem>             

              <CollapsableNavItem eventKey="message/" title="セグメント配信" icon={UserGroupIcon}>
                <NavItem title="メッセージ配信" link={Paths.SendSegments.path} />
                <NavItem title="テンプレート" link={Paths.TemplateMessages.path} />
                <NavItem title="配信履歴" link={Paths.SendHistories.path} />
              </CollapsableNavItem>  

              <CollapsableNavItem eventKey="visitor/" title="来店・販促管理" icon={StoreIcon}>
                <NavItem title="来店履歴" link={Paths.VisitorHistories.path} />
                <NavItem title="特典設定" badgeBg="danger" link={Paths.Privileges.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="ec/" title="EC管理" icon={ShoppingCartIcon}>
                <NavItem title="商品登録" link={Paths.Products.path} />
                <NavItem title="カテゴリー設定" link={Paths.ProductCategory.path} />
                <NavItem title="クーポン作成" link={Paths.Coupons.path} />
                <NavItem title="注文リスト" link={Paths.Orders.path} />
                <NavItem title="取置リスト" link={Paths.Reserves.path} />
                <NavItem title="送料設定" link={Paths.Postage.path} />
                <NavItem title="プライバシーポリシー" link={Paths.PrivacyPolicy.path} />
                <NavItem title="利用規約" link={Paths.TermsOfService.path} />
                <NavItem title="特定商取引法に基づく表記" link={Paths.SpecificTrades.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="event/" title="予約管理" icon={CalendarIcon}>
                <NavItem title="予約枠作成" link={Paths.EventCalendar.path} />
                <NavItem title="予約リスト" link={Paths.Events.path} />
              </CollapsableNavItem>

              <NavItem title="友達紹介管理" link={Paths.Invitations.path} icon={UserAddIcon} />

              <NavItem title="アンケート管理" icon={PencilAltIcon} link={Paths.CreateQuestionnaire.path} />

              <CollapsableNavItem eventKey="line/" title="アカウント管理" icon={CogIcon}>
                <NavItem title="リッチメニュー設定" link={Paths.RichMenu.path} />
                <NavItem title="あいさつ文設定" link={Paths.Greeting.path} />
                <NavItem title="お友達追加用QR" link={Paths.QrCode.path} />
                <NavItem title="権限管理" link={Paths.Accounts.path} />
                <NavItem title="API設定" link={Paths.Api.path} />
              </CollapsableNavItem>

            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};