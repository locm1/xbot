import React, { useState, useRef } from "react";
import { DownloadIcon, CloudDownloadIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";
import Swal from "sweetalert2";
import QRCode from "qrcode.react";
import Pagination from "@/components/Pagination";
import InflowRouteContentLoader from "@/pages/inflow_route/InflowRouteContentLoader";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";

export const InflowRouteTable = (props) => {
  const { inflows, setInflows, links, getInflowRoutes, setLinks, paginate, setPaginate, showConfirmDeleteModal, isRendered } = props;
  const [isHover, setIsHover] = useState(false);

  const downloadQR = (id) => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const TableRow = (props) => {
    const { id, name, uri, count } = props;

    const style = {
      backgroundColor: isHover ? 'lightblue' : '',
      zIndex: 100
    }

    return (
      <tr className="border-bottom">
        <td>
          {name}
        </td>
        <td>
          {/* <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='hoverQR'> */}
          <div className="img-box" onClick={() => downloadQR(`qr-${id}`)}>
            <QRCode
              id={`qr-${id}`}
              value={uri}
              size={150}
              level={"L"}
              includeMargin={false}
              style={style}
            />
            <div className='hoverQR' width={150} height={150}>
              <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                <DownloadIcon className="icon icon-lg QRicon" color="white" />
              </div>
            </div>
          </div>
          {/* <Button onClick={() => downloadQR(`qr-${id}`)} variant="gray-800" className="mt-2">
            <CloudDownloadIcon className="icon icon-xs me-2" />
            Download QR
          </Button> */}
        </td>
        <td>
          {uri}
        </td>
        <td>
          {count}
        </td>
        <td className="text-center">
          {/* <Button  variant="info" as={Link} to={link} size="sm" className="d-inline-flex align-items-center me-3"> */}
          <Button onClick={() => showConfirmDeleteModal(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Table hover className="user-table align-items-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border-bottom">管理名称</th>
            <th className="border-bottom">生成QRコード</th>
            <th className="border-bottom">URL</th>
            <th className="border-bottom">カウント</th>
            <th className="border-bottom">削除</th>
          </tr>
        </thead>
        <tbody className="border-0">
          {
            isRendered ? (
              inflows.map((v, k) => <TableRow key={`inflow-${k}`} {...v} />)
            ) : (
              <InflowRouteContentLoader />
            )
          }
        </tbody>
      </Table>
      {
        isRendered ? (
          <Pagination
            links={links}
            paginate={paginate}
            getListBypage={getInflowRoutes}
            setList={setInflows}
            setLinks={setLinks}
            setPaginate={setPaginate}
          />
        ) : (
          <PaginationContentLoader />
        )
      }
    </Card>
  );
};