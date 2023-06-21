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
    const dataFetch = async () => {
      const idToken = liff.getIDToken();
      try {
        const user = await getUser(idToken, setUser)
        storeVisitorHistory(user.id, storeComplete, {liffToken: idToken})
      } catch (error) {
        console.error(error)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        ).then((result) => {
          //LIFF閉じる
          liff.closeWindow()
        })
      }
    }

    dataFetch()
    //すでに来店していたらエラーページs
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