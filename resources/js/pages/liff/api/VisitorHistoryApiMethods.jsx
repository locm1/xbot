import Swal from "sweetalert2";

export const getVisitorHistoryCount = async (userId, setVisitorCount, setIsLoading) => {
  return await axios.get(`/api/v1/users/${userId}/visitor-histories`)
  .then((response) => {
    console.log(response.data.visitor_histories_count);
    setVisitorCount(response.data.visitor_histories_count)
    setIsLoading(false)
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false)
  });
};


export const storeVisitorHistory = async (userId) => {
  return await axios.post(`/api/v1/users/${userId}/visitor-histories`)
  .then((response) => {
    Swal.fire({
      icon: 'success',
      title: '来店処理完了',
      text: '来店履歴にデータが作成されました',
      showConfirmButton: false,
      timer: 1500
    })
  })
  .catch(error => {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: '来店処理失敗',
      text: '来店処理に失敗しました',
      showConfirmButton: false,
      timer: 1500
    })
  });
};