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

export const updateMessage = async (id, message, updateComplete) => {
  axios.put(`/api/v1/management/messages/${id}`, message)
  .then((response) => {
    updateComplete()
  })
  .catch(error => {
      console.error(error);
  });
};