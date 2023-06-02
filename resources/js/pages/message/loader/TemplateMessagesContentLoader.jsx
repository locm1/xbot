
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card, Table, Pagination } from 'react-bootstrap';

import { UsersTable } from "@/pages/user/UsersTable";
import { getUsers, getDemographic, deleteUser, getTags } from "@/pages/user/api/UserApiMethods";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map(v =>
          <tr className="border-bottom">
            <td>
              <ContentLoader
                height={39.375}
                width={184.45}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="184" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={360.66}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="139" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={254.58}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="28" height="18" />
              </ContentLoader>
            </td>
            <TableButtonContentLoader />
          </tr>
        )
      }
    </>
  );
};
