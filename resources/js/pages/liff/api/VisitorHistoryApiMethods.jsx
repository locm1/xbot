import Swal from "sweetalert2";

export const getVisitorHistoryCount = async (userId, liffToken, setVisitorCount) => {
  const params = {params: {liffToken: liffToken}}
  return await axios.get(`/api/v1/users/${userId}/visitor-histories`, params)
  .then((response) => {
    const visitor_histories_count = response.data.visitor_histories_count
    console.log(visitor_histories_count);
    setVisitorCount(visitor_histories_count)
    return visitor_histories_count;
  })
  .catch(error => {
      console.error(error);
  });
};


export const storeVisitorHistory = async (userId, liffToken) => {
  return await axios.post(`/api/v1/users/${userId}/visitor-histories`, liffToken)
  .then((response) => {
    const message = {
      text: '来店が完了しました',
      status: 200
    }
    return message;
  })
  .catch(error => {
    console.error(error);
    if (error.response.status === 512) {
      var message = {
        text: 'すでに来店済みです。',
        status: 512
      }
    } else {
      var message = {
        text: '来店処理に失敗しました',
        status: 500
      }
    }
    return message
  });
};


export const checkIfVisitedToday = async (userId, setIsCreated) => {
  // const params = {params: {liffToken: liffToken}}
  return await axios.get(`/api/v1/users/${userId}/visitor/check-today`)
  .then((response) => {
    const result = response.data.result
    console.log(result);
    setIsCreated(result)
    return result
  })
  .catch(error => {
      console.error(error);
  });
};