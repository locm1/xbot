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

export const showMessage = async (id, setMessage) => {
  axios.get(`/api/v1/management/messages/${id}`)
  .then((response) => {
    setMessage(response.data.message);
    console.log(response.data.message);
  })
  .catch(error => {
      console.error(error);
  });
};