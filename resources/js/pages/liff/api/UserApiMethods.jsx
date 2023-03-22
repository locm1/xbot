export const getUser = async (idToken, setUser) => {
  const searchParams = {
    params: { token: idToken }
  };
  return await axios.get('/api/v1/users', searchParams)
  .then((response) => {
    setUser(response.data.user)
    console.log(response.data.user);
    return response.data.user;
  })
  .catch(error => {
      console.error(error);
      alert(error);
  });
};

export const updateUser = async (id, formValue, setErrors) => {
  axios.put(`/api/v1/users/${id}`, formValue)
  .then((response) => {
    console.log(response.data.user);
  })
  .catch(error => {
      console.error(error);
      setErrors(error.response.data.errors)
  });
};