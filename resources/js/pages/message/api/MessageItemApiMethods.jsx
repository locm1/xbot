export const getMessageItems = async (id, setMessageItems) => {
  return await axios.get(`/api/v1/management/messages/${id}/items`)
  .then((response) => {
    const message_items = response.data.message_items;
    console.log(message_items);
    if (message_items.length > 0) {
      var messageItems = message_items.map((v, k) => ({...v, display_id: k + 1}));
      messageItems.forEach(item => {
        if (!item.carousel_images.length) {
          item.carousel_images = [{id: null, display_id: 1, image_path: null, label: '', uri: '', is_deleted: false}];
        } else {
          item.carousel_images = item.carousel_images.map((v, k) => ({...v, display_id: k + 1, is_deleted: false}))
        }
        if (!item.carousel_products.length) {
          item.carousel_products = [{id: null, display_id: 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false}];
        } else {
          item.carousel_products = item.carousel_products.map((v, k) => ({...v, display_id: k + 1, is_deleted: false}))
        }
      });
      console.log(messageItems);
    } else {
      var messageItems = [
        {
          display_id: 1, id: null, type: 1, text: '', image_path: null, video_path: null, 
          carousel_images: [{id: null, display_id: 1, image_path: null, label: '', uri: '', is_deleted: false}],
          carousel_products: [{id: null, display_id: 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false}]
        }
      ]
    }
    setMessageItems(messageItems);
    return messageItems;
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

export const updateMessageItems = async (id, formData, setError) => {
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
      console.log(error.response.data.errors);
      setError(error.response.data.errors)
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