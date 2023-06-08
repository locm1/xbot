
import React, { useState } from "react";
import moment from "moment-timezone";
import { BellIcon, CogIcon, InboxIcon, MenuAlt1Icon, SearchIcon, SupportIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Row, Col, Nav, Form, Image, Button, Navbar, Dropdown, Container, ListGroup, InputGroup } from 'react-bootstrap';

import Profile3 from "@img/img/team/profile-picture-3.jpg";
import Cookies from 'js-cookie';
import { Paths } from "@/paths";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";


export default (props) => {
  const history = useHistory();
  const { admin } = props;

  const toggleContracted = () => props.toggleContracted && props.toggleContracted();

  const logout = (e) => {
    e.preventDefault();

    // ログアウト
    axios.post('/api/v1/logout').then(response => {
      history.push(Paths.Signin.path);
    }).catch(error => {
      console.log(error);
    })
  };


  return (
    <Navbar expand variant="dark" className="navbar-top navbar-dashboard ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Button
              size="lg"
              id="sidebar-toggle"
              variant="icon-only"
              className="sidebar-toggle d-none d-lg-inline-block align-items-center justify-content-center me-3"
              onClick={toggleContracted}
            >
              <MenuAlt1Icon className="toggle-icon" />
            </Button>
          </div>
          <Nav className="align-items-center">

            <Dropdown as={Nav.Item} className="ms-lg-3">
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">{admin.name}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu onClick={(e) => logout(e)} className="dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <Dropdown.Item className="d-flex align-items-center">
                  <LogoutIcon className="dropdown-icon text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
