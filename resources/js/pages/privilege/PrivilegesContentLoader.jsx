
import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  const loadingContents = [_, _, _,];
  
  return (
    <>
      {
        loadingTables.map(v =>
          <Card border={1} className="mb-3">
            <Card.Header className="border-0">
              <ContentLoader
                height={40}
                width={400}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Card.Header>
            <Card.Body>
              {
                loadingContents.map(v => 
                  <div className="pb-3">
                    <ContentLoader
                      height={50}
                      width={1400}
                      speed={1}
                    >
                      <rect x="0" y="10" rx="3" ry="3" width="30%" height="100%" />
                      <rect x="500" y="10" rx="3" ry="3" width="5%" height="100%" />
                    </ContentLoader>
                  </div>
                )
              }
            </Card.Body>
          </Card>
        )
      }
    </>
  );
};
