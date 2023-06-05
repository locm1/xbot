export const getGreetingMessages = async (setMessages) => {
  return await axios.get('/api/v1/management/greeting-messages')
  .then((response) => {
    console.log(response.data.greeting_messages);

    const greeting_messages = response.data.greeting_messages;
    const resultMessages = (greeting_messages.length > 0) ? greeting_messages : [{id: 1, type: 1, text: '', image_path: null, video_path: null}];
    setMessages(resultMessages);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeGreetingMessages = async (formData, completeMessage, setError) => {
  axios.post(`/api/v1/management/greeting-messages`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    console.log(response.data.greeting_messages);
    completeMessage('作成');
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};

export const updateGreetingMessages = async (formData, completeMessage, setError) => {
  axios.post(`/api/v1/management/greeting-messages`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    }
  })
  .then((response) => {
    console.log(response.data.greeting_messages);
    completeMessage('更新');
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};

export const deleteGreetingMessages = async (params) => {
  axios.delete(`/api/v1/management/greeting-messages`, {data: params})
  .then((response) => {
    console.log(response);
  })
  .catch(error => {
      console.error(error);
  });
};