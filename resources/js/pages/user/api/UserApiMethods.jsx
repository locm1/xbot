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
    const users = response.data.users.data;
    setUsers(users.map(u => ({ ...u, isSelected: false, show: true })));
  })
  .catch(error => {
      console.error(error);
  });
};

export const showUser = async (id, setUser) => {
  axios.get(`/api/v1/management/users/${id}`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setUser(res.data.user);
      }
    });
};

export const deleteUser = async (id, completeDelete) => {
  axios.delete(`/api/v1/management/users/${id}`)
  .then((response) => {
    completeDelete();
  })
  .catch(error => {
      console.error(error);
  });
};


export const getOccupations= async (setOccupations) => {
  axios.get(`/api/v1/occupations`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setOccupations(res.data.occupations);
      }
    });
};

export const getUserTag = async (id, setSelectedTags, setTags) => {
  axios.get(`/api/v1/management/users/${id}/user_tag`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const selectedOptions = res.data.user_tags.map(v => ({ value: v.id, label: v.name }));
        setSelectedTags(selectedOptions);
      }
    });
    axios.get(`/api/v1/management/user_tags`)
    .then((data) => {
      setTags(data.data.tags);
    })
    .catch(error => {
        console.error(error);
    });
};

export const getUserPurchase = async (id, setPurchaseTime) => {
  axios.get(`/api/v1/management/users/${id}/purchase`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setPurchaseTime(res.data.purchase_time);
      }
    });
};