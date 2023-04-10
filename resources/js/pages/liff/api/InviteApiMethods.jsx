export const getInviteMessage = async (userId, setMessages, setLink) => {
  axios.get(`/api/v1/users/${userId}/invites`)
  .then((response) => {
    const messages = response.data.messages;
    setMessages([messages.message]);
    setLink(messages.url)
    console.log([messages.message]);
  })
  .catch(error => {
      console.error(error);
  });
};