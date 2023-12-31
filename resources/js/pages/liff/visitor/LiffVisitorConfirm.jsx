import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useParams } from "react-router-dom";
import liff from '@line/liff';
import Swal from "sweetalert2";
import LiffVisitorUserInfo from "./LiffVisitorUserInfo";
import { showOccupation } from "@/pages/liff/api/OccupationApiMethods";
import { checkIfVisitedToday } from "@/pages/liff/api/VisitorHistoryApiMethods";

export default () => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [occupation, setOccupation] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const params = useParams();  

  const handleChange = (e) => {
    setPassword(e.target.value);
  }

  const dataFetch = async (user) => {
    try {
      await showOccupation(user.occupation_id, setOccupation)
      const result = await checkIfVisitedToday(user.id)
      setIsCreated(result)
      setIsConfirmed(true);
    } catch (error) {
      Swal.fire(
        `データ取得エラー`,
        'データが正常に取得できませんでした',
        'error'
      )
    }
  }

  const handleClick = () => {
    const formValue = {
      password: password
    }
    axios.post(`/api/v1/users/${params.userId}/visitor-confirm/auth`, formValue)
    .then(response => {
      const user = response.data.user;
      setUser(user);
      dataFetch(user)
    })
    .catch(error => {
      const message = error.response.status === 400 ? 'パスワードが違います' : '不正なトークンが送られました'
      Swal.fire(
        '認証失敗',
        message,
        'error'
      )
    })
  }

  const handleCreate = () => {
    const formValue = {
      password: password
    }
    axios.post(`/api/v1/users/${params.userId}/visitor-confirm/create`, formValue)
    .then(response => {
      setIsCreated(true);
    })
    .catch(error => {
      const message = error.response.status === 400 ? 'パスワードが違います' : '不正なトークンが送られました'
      if (error.response.status === 512) {
        setIsCreated(true);
        Swal.fire(
          '来店失敗',
          'すでに来店済みです。',
          'error'
        )
      } else {
        Swal.fire(
          '認証失敗',
          message,
          'error'
        )
      }
    })
  }

  return (
    isConfirmed ?
      <div className="p-3">
        <LiffVisitorUserInfo user={user} occupation={occupation} />
        <div className="align-items-center my-3">
          {isCreated ? 
            <Button disabled variant="success" className='mt-2 w-100'>
              来店済み
            </Button>
            :
            <Button onClick={handleCreate} variant="success" className='mt-2 w-100'>
              来店済みにする
            </Button>
          }
        </div>
      </div>
    :
      <Card className="m-3 p-3">
        <div className="text-center mb-3">パスワードを入力してください</div>
        <Form.Control type="password" value={password} onChange={handleChange} className="mb-3"></Form.Control>
        <Button onClick={handleClick}>送信</Button>
      </Card>
  )
}