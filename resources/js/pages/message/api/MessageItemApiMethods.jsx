export const getMessageItems = async (id, setMessageItems) => {
  return await axios.get(`/api/v1/management/messages/${id}/items`)
  .then((response) => {
    const message_items = response.data.message_items;
    console.log(message_items);

    if (message_items.length > 0) {
      setMessageItems(message_items);
    } else {
      setMessageItems([
        {id: 1, type: 1, text: '', image_path: null, video_path: null}
      ]);
    }
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