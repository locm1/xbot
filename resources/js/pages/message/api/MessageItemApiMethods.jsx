export const getMessageItems = async (id, setMessageItems) => {
  axios.get(`/api/v1/management/messages/${id}/items`)
  .then((response) => {
    console.log(response.data.message_items);
    setMessageItems(response.data.message_items);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeMessageItems = async (id, formData) => {
  axios.post(`/api/v1/management/messages/${id}/items`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    console.log(response.data.message_item);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateMessageItems = async (id, formData) => {
  axios.post(`/api/v1/management/messages/${id}/items`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    }
  })
  .then((response) => {
    console.log(response.data.message_item);
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteMessageItem = async (id, params) => {
  axios.delete(`/api/v1/management/messages/${id}/items`, {data: params})
  .then((response) => {
    console.log(response);
  })
  .catch(error => {
      console.error(error);
  });
};