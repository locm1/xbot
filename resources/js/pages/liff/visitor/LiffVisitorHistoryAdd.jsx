import axios from "axios";
import { useEffect, useState } from "react"
import { Route, Switch, Redirect, useHistory, useLocation, Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import liff from '@line/liff';
import { Paths } from "@/paths";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { storeVisitorHistory } from "@/pages/liff/api/VisitorHistoryApiMethods";

export default () => {
  const history = useHistory();
  const [user, setUser] = useState({
    is_registered: 0
  });

  useEffect(() => {
    const idToken = liff.getIDToken();
    getUser(idToken, setUser).then(response => 
      storeVisitorHistory(response.id, storeComplete)
    )
  }, []);

  const storeComplete = (messages) => {
    history.push({
      pathname: Paths.LiffVisitorHistoryResult.path,
      state: {
        messages: messages
      }
    })
  } 

  return (
    <></>
  )
}