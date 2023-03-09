export const getGreetingMessages = async (setMessages) => {
  axios.get('/api/v1/management/greeting-messages')
  .then((response) => {
    console.log(response.data.greeting_messages);

    if (response.data.greeting_messages.length > 0) {
      setMessages(response.data.greeting_messages);
    } else {
      setMessages([
        {id: 1, type: 1, text: '', image_path: null, video_path: null}
      ]);
    }
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeGreetingMessages = async (formData, completeMessage) => {
  axios.post(`/api/v1/management/greeting-messages`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    console.log(response.data.message_item);
    completeMessage('作成');
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateGreetingMessages = async (formData, completeMessage) => {
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