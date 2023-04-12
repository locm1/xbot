import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default () => {
  const [password, setPassword] = useState('');
  const params = useParams();  

  const handleChange = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = () => {
    axios.post('/api/v1/visitor-confirm', {user_id: params.userId, password: password})
    .then(response => {
      Swal.fire(
        '来店処理完了',
        '来店履歴にデータが作成されました',
        'success'
      )
      setPassword('');
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
    <Card className='m-3 p-3'>
      <div className='text-center mb-3'>パスワードを入力してください</div>
      <Form.Control value={password} onChange={handleChange} className="mb-3"></Form.Control>
      <Button onClick={handleClick}>送信</Button>
    </Card>
  )
}