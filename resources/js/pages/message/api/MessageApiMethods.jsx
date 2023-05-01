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

export const getAllMessages = async (params, setMessages) => {
  axios.get('/api/v1/management/messages', params)
  .then((response) => {
    const messages = response.data.messages;
    setMessages(messages);
  })
  .catch(error => {
      console.error(error);
  });
};

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

export const storeMessage = async (formData, setError, completeMessage) => {
  return await axios.post('/api/v1/management/messages', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    const message = response.data.message;
    completeMessage('作成');
    return message;
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
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

export const updateMessage = async (id, formData, setError, completeMessage) => {
  axios.post(`/api/v1/management/messages/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    }
  })
  .then((response) => {
    console.log(response);
    completeMessage('更新')
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};

export const deleteMessage = async (id, deleteComplete) => {
  axios.delete(`/api/v1/management/messages/${id}`)
  .then((response) => {
    deleteComplete(id);
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
