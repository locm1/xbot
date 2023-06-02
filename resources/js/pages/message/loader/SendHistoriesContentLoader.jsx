
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card, Table, Pagination } from 'react-bootstrap';

import { UsersTable } from "@/pages/user/UsersTable";
import { getUsers, getDemographic, deleteUser, getTags } from "@/pages/user/api/UserApiMethods";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

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
                width={188.22}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="45" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={230}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="120" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={331}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="143" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={167.3}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="45" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={150}
                speed={1}
              >
                <rect x="15" y="2" rx="3" ry="3" width="50" height="35" />
              </ContentLoader>
            </td>
          </tr>
        )
      }
    </>
  );
};
