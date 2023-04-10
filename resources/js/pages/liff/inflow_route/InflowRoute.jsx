import React, { useState, useRef, useEffect } from "react";
import { Image, Form, Button, Card } from 'react-bootstrap';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { Link, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import liff from '@line/liff';

import LineFigure from "@img/img/line-figure.png";

export default () => {
  const { key } = useParams();
  const [ errorMessage, setErrorMessage ] = useState();
  useEffect(() => {
      const idToken = liff.getIDToken();
      console.log(idToken);
      const data = { key: key, idToken: idToken };
      axios.post('/api/v1/inflow-route-users', data)
      .then((response) => {
        if (response)
        console.log(response);
        location.href = "https://lin.ee/nGVYloK";
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 500) {
          // liff.login({ redirectUri: "/inflow-route/acm5jylbds81khv"});
        }
        setErrorMessage(error.response.data.message);
      });
  }, []);


  return (
    <>
      {errorMessage}
    </>
  );
};
