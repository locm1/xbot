import Swal from "sweetalert2"

const completeMessage = (message) => {
  Swal.fire(
    `${message}完了`,
    `メッセージの${message}に成功しました`,
    'success'
  )
} 

const failedMessage = (message) => {
  Swal.fire(
    `${message}失敗`,
    `メッセージの${message}に失敗しました`,
    'error'
  )
} 

export const getMessages = async (params, setMessages, setLinks, setPaginate) => {
  axios.get('/api/v1/management/messages', params)
  .then((response) => {
    const messages = response.data.messages;
    setMessages(messages.data);
    setLinks([...Array(messages.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: messages.current_page, 
      per_page: messages.per_page,
      from: messages.from,
      to: messages.to,
      total: messages.total,
    })
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeMessage = async (message, formData, storeMessageItems, completeMessage) => {
  axios.post('/api/v1/management/messages', message)
  .then((response) => {
    const message = response.data.message;
    storeMessageItems(message.id, formData)
    completeMessage('作成');
  })
  .catch(error => {
      console.error(error);
  });
};

export const showMessage = async (id, setMessage, setIsUndisclosed) => {
  axios.get(`/api/v1/management/messages/${id}`)
  .then((response) => {
    const message = response.data.message;
    setMessage(message);
    setIsUndisclosed(message.is_undisclosed == 1 ? true : false);
    console.log(response.data.message);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateMessage = async (id, message, completeMessage) => {
  axios.put(`/api/v1/management/messages/${id}`, message)
  .then((response) => {
    completeMessage('更新')
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteMessage = async (id, deleteComplete, setMessages, messages) => {
  axios.delete(`/api/v1/management/messages/${id}`)
  .then((response) => {
    deleteComplete();
    setMessages(messages.filter((message) => (message.id !== id)));
  })
  .catch(error => {
      console.error(error);
  });
};

export const sendMulticastMessage = async (data) => {
  return axios.post('/api/v1/management/send-multicast-message', data)
  .then((response) => {
    response.data ? completeMessage(data.timing == 0 ? '配信' : '予約') : failedMessage(data.timing == 0 ? '配信' : '予約')
    console.log(response);
  })
  .catch(error => {
      failedMessage(data.timing == 0 ? '配信' : '予約')
      console.error(error);
  });
};
