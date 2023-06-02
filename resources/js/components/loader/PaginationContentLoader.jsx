
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card, Table, Pagination } from 'react-bootstrap';

import { UsersTable } from "@/pages/user/UsersTable";
import { getUsers, getDemographic, deleteUser, getTags } from "@/pages/user/api/UserApiMethods";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  return (
    <>
      <ContentLoader
        height={95.59}
        width={1251}
        speed={1}
      >
        <rect x="15" y="33" rx="3" ry="3" width="25" height="35" />
        <rect x="50" y="50" rx="3" ry="3" width="125" height="17.5" />
        <rect x="1100" y="33" rx="3" ry="3" width="400" height="35" />
      </ContentLoader>
    </>
  );
};
