import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LiffVisitorUserInfo from "./LiffVisitorUserInfo";

export default () => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const params = useParams();  

  const handleChange = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = () => {
    axios.post('/api/v1/visitor-confirm/auth', {user_id: params.userId, password: password})
    .then(response => {
      setUser(response.data.user);
      setIsConfirmed(true);
    })
    .catch(error => {
      Swal.fire(
        '認証失敗',
        'パスワードが違います',
        'error'
      )
    })
  }

  const handleCreate = () => {
    axios.post('/api/v1/visitor-confirm/create', {user_id: params.userId, password: password})
    .then(response => {
      setIsCreated(true);
    })
    .catch(error => {
      Swal.fire(
        '認証失敗',
        'パスワードが違います',
        'error'
      )
    })
  }

  return (
    isConfirmed ?
      <div className="p-3">
        <LiffVisitorUserInfo user={user} />
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
      <Card className='m-3 p-3'>
        <div className='text-center mb-3'>パスワードを入力してください</div>
        <Form.Control type="password" value={password} onChange={handleChange} className="mb-3"></Form.Control>
        <Button onClick={handleClick}>送信</Button>
      </Card>
  )
}