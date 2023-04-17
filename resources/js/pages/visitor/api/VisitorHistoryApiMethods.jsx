export const getVisitorHistories = async (params, setVisitorHistories, setLinks, setPaginate) => {
  axios.get('/api/v1/management/visitor-histories', params)
  .then((response) => {
    const visitorHistories = response.data.visitor_histories;
    setVisitorHistories(visitorHistories.data);
    setLinks([...Array(visitorHistories.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: visitorHistories.current_page, 
      per_page: visitorHistories.per_page,
      from: visitorHistories.from,
      to: visitorHistories.to,
      total: visitorHistories.total,
    })
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchVisitorHistories = async (params, setVisitorHistories, setLinks, setPaginate) => {
  axios.get('/api/v1/management/visitor-histories', params)
  .then((response) => {
    const visitorHistories = response.data.visitor_histories;
    setVisitorHistories(visitorHistories.data);
    const links = visitorHistories.links;
    links.shift();
    links.pop();
    setLinks(links)
    setPaginate({
      current_page: visitorHistories.current_page, 
      per_page: visitorHistories.per_page,
      from: visitorHistories.from,
      to: visitorHistories.to,
      total: visitorHistories.total,
    })
  })
  .catch(error => {
      console.error(error);
  });
};


export const showVisitorHistory = async (id, setMemo, setCreatedAt) => {
  axios.get(`/api/v1/management/visitor-histories/${id}`)
  .then((response) => {
    const visitorHistory = response.data.visitor_history;
    setCreatedAt(visitorHistory.created_at)
    setMemo(visitorHistory.memo);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateVisitorHistory = async (id, visitorHistory, updateComplete) => {
  axios.put(`/api/v1/management/visitor-histories/${id}`, visitorHistory)
  .then((response) => {
    updateComplete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const showUserByVisitorHistory = async (id, setUser) => {
  axios.get(`/api/v1/management/visitor-histories/${id}/user`)
  .then((response) => {
    setUser(response.data.visitor_history_user)
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteVisitorHistory= async (id, completeDelete) => {
  axios.delete(`/api/v1/management/visitor-histories/${id}`)
  .then((response) => {
    completeDelete();
  })
  .catch(error => {
      console.error(error);
  });
};