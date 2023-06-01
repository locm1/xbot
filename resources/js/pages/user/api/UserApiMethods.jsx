export const getUsers = async (params, setUsers, setLinks, setPaginate, setIsRendered) => {
  return axios.get('/api/v1/management/users', params)
  .then((response) => {
    const users = response.data.users;
    setUsers(users.data);
    setLinks([...Array(users.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: users.current_page, 
      per_page: users.per_page,
      from: users.from,
      to: users.to,
      total: users.total,
    })
    setIsRendered(true);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getDemographic = async (setDemographic) => {
  axios.get('/api/v1/management/demographic')
  .then((response) => {
    const friend = response.data.demographic.friend;
    const blocked = response.data.demographic.blocked;
    const registered = response.data.demographic.registered;
    const genders = response.data.demographic.genders;
    setDemographic({
      friend: friend, blocked: blocked, registered: registered, man: genders['male'], women: genders['female'], others: genders["other"]
    });
  })
  .catch(error => {
      console.error(error);
  });
};

export const showUser = async (id, setUser, setIsRendered) => {
  axios.get(`/api/v1/management/users/${id}`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setUser(res.data.user);
        setIsRendered(true);
      }
    });
};

export const deleteUser = async (id, completeDelete) => {
  axios.delete(`/api/v1/management/users/${id}`)
  .then((response) => {
    completeDelete(id);
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
  axios.get(`/api/v1/management/user_tags`)
    .then((data) => {
      setTags(data.data.tags);
    })
    .catch(error => {
        console.error(error);
    });
  return axios.get(`/api/v1/management/users/${id}/user_tag`)
      .then((res) => {
        if(res.status !== 200) {
          throw new Error("APIが正しく取得されませんでした");
        } else {
          const selectedOptions = res.data.user_tags.map(v => ({ value: v.id, label: v.name }));
          setSelectedTags(selectedOptions);
        }
      });
};


export const getTags = async (setTags) => {
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


export const getQuestionnaireAnswer = (id, setQuestionnaireAnswers) => {
  axios.get(`/api/v1/management/users/${id}/questionnaire`)
  .then((res) => {
    if(res.status !== 200) {
      throw new Error("APIが正しく取得されませんでした");
    } else {
      setQuestionnaireAnswers(res.data.questionnaireAnswers);
      console.log(res.data.questionnaireAnswers);
    }
  });
};