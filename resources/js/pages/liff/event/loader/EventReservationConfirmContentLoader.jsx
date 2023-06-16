import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Table, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const reservationContents = [...Array(3)].map((_, i) => i + 1);

  return (
    <div className="mx-3 mt-3">
      <Card border="0" className="shadow my-3">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">予約情報</h5>
        </Card.Header>  
        <Card.Body className="p-0">
          <Table className="mb-0">
            <tbody className="border-0">
              {
                reservationContents.map(v =>
                  <tr className="border-bottom" key={`reservation-loader-${v}`}>
                    <ContentLoader
                      height={50.7}
                      width={361.69}
                      speed={1}
                    >
                      <rect x="20" y="20%" rx="3" ry="3" width="20%" height="70%" />
                      <rect x="40%" y="20%" rx="3" ry="3" width="50%" height="70%" />
                    </ContentLoader>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card border="0" className="shadow my-3">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">お客様情報</h5>
        </Card.Header>  
        <Card.Body className="p-0">
          <Table className="mb-0">
            <tbody className="border-0">
              {
                reservationContents.map(v =>
                  <tr className="border-bottom" key={`user-reservation-loader-${v}`}>
                    <ContentLoader
                      height={50.7}
                      width={361.69}
                      speed={1}
                    >
                      <rect x="20" y="20%" rx="3" ry="3" width="20%" height="70%" />
                      <rect x="40%" y="20%" rx="3" ry="3" width="50%" height="70%" />
                    </ContentLoader>
                  </tr>
                )
              }
              <tr className="border-bottom">
                <ContentLoader
                  height={150}
                  width={361.69}
                  speed={1}
                >
                  <rect x="20" y="20%" rx="3" ry="3" width="20%" height="15%" />
                  <rect x="40%" y="25" rx="3" ry="3" width="50%" height="15%" />
                  <rect x="40%" y="50" rx="3" ry="3" width="50%" height="15%" />
                  <rect x="40%" y="75" rx="3" ry="3" width="50%" height="15%" />
                  <rect x="40%" y="100" rx="3" ry="3" width="50%" height="15%" />
                </ContentLoader>
              </tr>
              <tr className="border-bottom">
                <ContentLoader
                  height={50.7}
                  width={361.69}
                  speed={1}
                >
                  <rect x="20" y="20%" rx="3" ry="3" width="20%" height="70%" />
                  <rect x="40%" y="20%" rx="3" ry="3" width="50%" height="70%" />
                </ContentLoader>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <div className="align-items-center m-4">
          <Button variant="success" className="w-100 p-3">
            予約を確定する
          </Button>
        </div>
      </Card>
    </div>
  );
};