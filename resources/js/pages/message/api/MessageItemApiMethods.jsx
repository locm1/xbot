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
