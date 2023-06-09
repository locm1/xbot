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


export const storeVisitorHistory = async (userId, storeComplete, liffToken) => {
  return await axios.post(`/api/v1/users/${userId}/visitor-histories`, liffToken)
  .then((response) => {
    // Swal.fire({
    //   icon: 'success',
    //   title: '来店処理完了',
    //   text: '来店履歴にデータが作成されました',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
    const messages = {
      text: '来店履歴にデータが作成されました',
      status: 200
    }
    storeComplete(messages)
  })
  .catch(error => {
    console.error(error);
    // Swal.fire({
    //   icon: 'error',
    //   title: '来店処理失敗',
    //   text: '来店処理に失敗しました',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
    const messages = {
      text: '来店処理に失敗しました',
      status: 500
    }
    storeComplete(messages)
  });
};