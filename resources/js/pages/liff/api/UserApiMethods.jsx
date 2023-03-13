export const getUser = async (idToken, setUser) => {
  const searchParams = {
    params: { token: idToken }
  };
  axios.get('/api/v1/users', searchParams)
  .then((response) => {
    setUser(response.data.user)
    console.log(response.data.user);
  })
  .catch(error => {
      console.error(error);
  });
};