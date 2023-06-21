import axios from "axios";
import { useEffect, useState } from "react"
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { Route, Switch, Redirect, useHistory, useLocation, Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import liff from '@line/liff';
import { Paths } from "@/paths";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { storeVisitorHistory } from "@/pages/liff/api/VisitorHistoryApiMethods";
import { checkIfVisitedToday } from "@/pages/liff/api/VisitorHistoryApiMethods";
import VisitorHistoryAddContentLoader from "@/pages/liff/visitor/loader/VisitorHistoryAddContentLoader";

export default () => {
  const history = useHistory();
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [isCreated, setIsCreated] = useState(false);
  const [message, setMessage] = useState({
    text: '', status: ''
  });

  useEffect(() => {
    const dataFetch = async () => {
      const idToken = liff.getIDToken();
      try {
        const user = await getUser(idToken, setUser)
        const result = await checkIfVisitedToday(user.id, setIsCreated)
        
        if (result) {
          setMessage({text: 'すでに来店済みです。', status: 512})
        } else {
          const message = await storeVisitorHistory(user.id, {liffToken: idToken})
          setMessage(message)
        }
        
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
  }, []);

  return (
    isCreated ? (
      <main className="">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list liff-check-icon-wrap">
          {
            message.status == 200 ? (
              <CheckCircleIcon className="icon liff-check-icon" />
            ) : (
              <ExclamationCircleIcon className="icon liff-check-icon" />
            )
          }
          <h3 className="mt-4 liff-check-complete-title">{message.text}</h3>
        </div>
      </main>
    ) : (
      <VisitorHistoryAddContentLoader />
    )
  )
}