import Swal from "sweetalert2";

export const getUserInfoStatuses = async (setUserInfoStatuses) => {
  return await axios.get('/api/v1/management/user-info-statuses')
  .then((response) => {
    console.log(response.data.user_info_statuses);
    setUserInfoStatuses(response.data.user_info_statuses);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateUserInfoStatuses = async (formValue) => {
  return await axios.put('/api/v1/management/user-info-statuses', formValue)
  .then((response) => {
    console.log(response.data.user_info_statuses);
    Swal.fire(
      '更新完了',
      '固定アンケートの更新に成功しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
  });
};