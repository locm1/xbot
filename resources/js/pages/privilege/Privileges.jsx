import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Col, Row, Button, Container, Card, Form, InputGroup } from "react-bootstrap";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';

import PrivilegeCard from "@/pages/privilege/PrivilegeCard";
import { storePrivileges, getPrivileges, updatePrivileges } from "@/pages/privilege/api/PrivilegeApiMethods";
import { Paths } from "@/paths";
import PrivilegesContentLoader from "@/pages/privilege/PrivilegesContentLoader.jsx"

export default () => {
  const [privileges, setPrivileges] = useState([]);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [time, setTime] = useState('');
  const [values, setValues] = useState({
    time: '', privileges: ['', '', '']
  })
  const [refresh, setRefresh] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const handleKeyDown = (e) => {
    e.preventDefault();
    storePrivileges(time, privileges, setPrivileges, setIsCreate);
    setTime('');
  };

  const createPrivilege = () => {
    storePrivileges(values);
    setRefresh(!refresh);
    setValues({time: '', privileges: ['', '', '']});
    setIsCreate(false);
  }

  useEffect(() => {
    getPrivileges(setPrivileges).then(
      setIsRendered(true)
    )
  }, [refresh]);

  const addForm = () => {
    setValues(prev => ({
      ...prev,
      privileges: [...prev.privileges, '']
    }))
  }
  
  const handleChange = (e) => {
    const index = parseInt(e.target.name); // 配列番号を数値に変換
    const newValue = e.target.value;
    setValues(prev => ({
      ...prev,
      privileges: [...prev.privileges.slice(0, index), newValue, ...prev.privileges.slice(index + 1)]
    }))
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4">
        <div className="d-block mb-md-0">
          <h1 className="page-title">特典設定</h1>
        </div>
      </div>

      <Container fluid className="cotainer px-0">
        <Row className="privilege-card-wrap">
          {
            isRendered ? (
              <>
                {
                  privileges && privileges.map(privilege => 
                    <PrivilegeCard 
                      key={`privilege-${privilege.id}`}
                      {...privilege}
                      setCardToEdit={setCardToEdit}
                      privileges={privileges}
                      setPrivileges={setPrivileges}
                      getPrivileges={getPrivileges}
                      updatePrivileges={updatePrivileges}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  )
                }
                {
                  isCreate ? (
                    <Card border={1} className="p-4 privilege-card-item">
                    {/* <Form onSubmit={(e) => handleKeyDown(e)} className=""> */}
                      <div className="m-0">
                        <p className="fw-bold m-0">1. 来店回数を数字で入力してください</p>
                          <div className="d-flex align-items-center mt-2">
                            <Form.Control
                              autoFocus
                              placeholder=""
                              style={{ width: 100 }}
                              type="number"
                              min="0"
                              step="1"
                              pattern="\d+"
                              value={values.time}
                              onChange={(e) => setValues(prev => ({...prev, time: +e.target.value}))}
                            />
                            <div className="ms-2">回</div>
                          </div>
                          <p className="fw-bold m-0 mt-4">2. 特典を設定してください</p>
                          {values.privileges.map((v, k) => 
                            <Form.Control 
                            key={`privilege-form-${k}`} 
                            name={k}
                            className="mt-2" 
                            placeholder="例：お菓子盛り合わせプレゼント"
                            onChange={handleChange}
                            />
                          )}
                          <div className="privilege-button mb-4">
                            <Button
                              variant="outline-gray-500"
                              onClick={addForm}
                              className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
                            >
                              <PlusIcon className="icon icon-xs me-2" /> 追加
                            </Button>
                          </div>
                        </div>
                      <Card.Footer className="p-0 pt-4">
                        <div className="d-flex justify-content-end">
                          <Button variant="success" className="btn-default-success" onClick={createPrivilege}>
                            保存する
                          </Button>
                        </div>
                      </Card.Footer>
                      {/* </Form> */}
                    </Card>
                  ) : (
                    <div className="privilege-button mb-4">
                      <Button
                        variant="outline-gray-500"
                        onClick={() => setIsCreate(!isCreate)}
                        className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
                      >
                        <PlusIcon className="icon icon-xs me-2" /> 特典カード追加
                      </Button>
                    </div>
                  )
                }
              </>
            ) : (
              <PrivilegesContentLoader />
            )
          }
        </Row>
      </Container>
    </>
  );
};
