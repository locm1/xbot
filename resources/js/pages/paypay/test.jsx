import axios from "axios"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"

export default () => {
  const [transactionId, setTransactionId] = useState('')

  const handleChange = (e) => {
    setTransactionId(e.target.value)
  }
  
  const handleClick = () => {
    axios.post('/api/v1/paypay-test', {transactionId: transactionId}).then(({ data }) => {
      location.href = data.url
    })
  }

  return (
    <main>
      <div>transaction id</div>
      <Form.Control value={transactionId} onChange={handleChange} />
      <Button onClick={handleClick}>
        送信
      </Button>
    </main>
  )
}