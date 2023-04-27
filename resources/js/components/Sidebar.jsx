import React, { useState, useEffect } from "react";
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

import { StoreIcon, GiftIcon } from "@/components/icons/Icons";

export default (props) => {
  const { admin, pages } = props;
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

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((value, index) => value === arr2[index]);
  }

  const NavItem = (props) => {
    const { title, link, target, icon: NavItemIcon, image, badgeText, badgeBg, badgeColor = "white" } = props;
    const classNames = badgeText ? "d-flex align-items-center justify-content-between" : "";
    const splitLink = link.split('/');
    const spilitPathname = pathname.split('/');
    if (spilitPathname[spilitPathname.length - 2] === 'edit' || spilitPathname[spilitPathname.length - 2] === 'detail') {
      spilitPathname[spilitPathname.length - 2] = 'list';
      spilitPathname.pop();
    }
    const navItemClassName = arraysEqual(splitLink, spilitPathname) ? "active" : "";
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
                <Image src={Logo} className="navbar-brand-dark navbar-logo-wrap mb-4" />
              </Link>
              {
                pages[0] && admin.role <= pages[0].role && (
                  <NavItem title="ダッシュボード" link={Paths.DashboardOverview.path} icon={ClipboardIcon} />
                )
              }

              {
                pages[1] && admin.role <= pages[1].role && (
                  <CollapsableNavItem eventKey="user/" title="顧客管理" icon={UserIcon}>
                    <NavItem title="ユーザーリスト" link={Paths.Users.path} />
                    <NavItem title="タグ設定" link={Paths.Tags.path} />
                  </CollapsableNavItem>
                )
              }

              {
                pages[2] && admin.role <= pages[2].role && (
                  <CollapsableNavItem eventKey="message/" title="セグメント配信" icon={UserGroupIcon}>
                    <NavItem title="メッセージ配信" link={Paths.SendSegments.path} />
                    <NavItem title="テンプレート" link={Paths.TemplateMessages.path} />
                    <NavItem title="配信履歴" link={Paths.SendHistories.path} />
                  </CollapsableNavItem>  
                )
              }

              {
                pages[3] && admin.role <= pages[3].role && (
                  <CollapsableNavItem eventKey="visitor/" title="来店・販促管理" icon={StoreIcon}>
                    <NavItem title="来店履歴" link={Paths.VisitorHistories.path} />
                    <NavItem title="特典設定" badgeBg="danger" link={Paths.Privileges.path} />
                  </CollapsableNavItem>
                )
              }

              {
                pages[4] && admin.role <= pages[4].role && (
                  <CollapsableNavItem eventKey="ec/" title="EC管理" icon={ShoppingCartIcon}>
                    <NavItem title="環境設定" link={Paths.Environment.path} />
                    <NavItem title="支払い設定" link={Paths.Payment.path} />
                    <NavItem title="商品管理" link={Paths.Products.path} />
                    <NavItem title="カテゴリー設定" link={Paths.ProductCategory.path} />
                    <NavItem title="クーポン作成" link={Paths.Coupons.path} />
                    <NavItem title="注文リスト" link={Paths.Orders.path} />
                    {/* <NavItem title="取置リスト" link={Paths.Reserves.path} /> */}
                    <NavItem title="送料設定" link={Paths.Postage.path} />
                    <NavItem title="プライバシーポリシー" link={Paths.PrivacyPolicy.path} />
                    <NavItem title="利用規約" link={Paths.TermsOfService.path} />
                    <NavItem title="特定商取引法に基づく表記" link={Paths.SpecificTrades.path} />
                </CollapsableNavItem>
                )
              }

              {
                pages[5] && admin.role <= pages[5].role && (
                  <CollapsableNavItem eventKey="event/" title="予約管理" icon={CalendarIcon}>
                    <NavItem title="予約枠作成" link={Paths.EventCalendar.path} />
                    <NavItem title="予約リスト" link={Paths.Events.path} />
                  </CollapsableNavItem>
                )
              }

              {
                pages[6] && admin.role <= pages[6].role && (
                  <NavItem title="友達紹介管理" link={Paths.InviteIncentives.path} icon={UserAddIcon} />
                )
              }

              {
                pages[7] && admin.role <= pages[7].role && (
                  <CollapsableNavItem eventKey="questionnaire/" title="アンケート管理" icon={PencilAltIcon}>
                    <NavItem title="固定アンケート管理" link={Paths.DefaultQuestionnaire.path} />
                    <NavItem title="アンケート管理" link={Paths.CreateQuestionnaire.path} />
                  </CollapsableNavItem>
                )
              }

              {
                pages[8] && admin.role <= pages[8].role && (
                  <CollapsableNavItem eventKey="account/" title="アカウント管理" icon={CogIcon}>
                    <NavItem title="リッチメニュー管理" link={Paths.RichMenus.path} />
                    <NavItem title="あいさつメッセージ設定" link={Paths.Greeting.path} />
                    <NavItem title="お友達追加用QR" link={Paths.QrCode.path} />
                    <NavItem title="アカウント管理" link={Paths.Accounts.path} />
                    <NavItem title="権限設定" link={Paths.Permissions.path} />
                    <NavItem title="流入経路管理" link={Paths.InflowRoute.path} />
                    <NavItem title="API設定" link={Paths.Api.path} />
                  </CollapsableNavItem>
                )
              }
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};