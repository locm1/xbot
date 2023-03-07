export const getMessages = async (setMessages) => {
  axios.get('/api/v1/management/messages')
  .then((response) => {
    console.log(response.data.messages);
    setMessages(response.data.messages);
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchMessages = async (params, setMessages) => {
  axios.get('/api/v1/management/messages', params)
  .then((response) => {
    setMessages(response.data.messages);
    console.log(response.data.messages);
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