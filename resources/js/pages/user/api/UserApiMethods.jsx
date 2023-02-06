export const getUsers = async (setUsers) => {
  axios.get('/api/v1/management/users')
  .then((response) => {
    setUsers(response.data.users.map(u => ({ ...u, isSelected: false, show: true })));
  })
  .catch(error => {
      console.error(error);
  });
};

export const getDemographic = async (setDemographic) => {
  axios.get('/api/v1/management/demographic')
  .then((response) => {
    const genders = response.data.genders;
    setDemographic({
      man: genders['1'], women: genders['2'], others: genders["3"]
    });
  })
  .catch(error => {
      console.error(error);
  });
};


export const searchUsers = async (params, setUsers) => {
  axios.get('/api/v1/management/users', params)
  .then((response) => {
    const users = response.data.users;
    setUsers(users.map(u => ({ ...u, isSelected: false, show: true })));
  })
  .catch(error => {
      console.error(error);
  });
};