import Swal from 'sweetalert2';

export const getAccounts = async (params, setAccounts, setLinks, setPaginate, setIsRendered) => {
  axios.get('/api/v1/management/admins', params)
  .then((response) => {
    const admins = response.data.admins;
    setAccounts(admins.data);
    setLinks([...Array(admins.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: admins.current_page, 
      per_page: admins.per_page,
      from: admins.from,
      to: admins.to,
      total: admins.total,
    })
    setIsRendered(true)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getAccount = async (id, setFormValue) => {
  await axios.get(`/api/v1/management/admins/${id}`)
  .then((response) => {
    const admin = response.data.admin;
    setFormValue({...admin, password: '', password_confirmation: ''})
  })
  .catch(error => {
    console.error(error);
  });
}

export const storeAccount = async (formValue, setError) => {
  await axios.post('/api/v1/management/admins', formValue)
  .then((response) => {
    Swal.fire(
      '登録完了',
      'アカウントの登録に成功しました',
      'success'
    )
    console.log(response);
  })
  .catch(error => {
    console.error(error);
    setError(error.response.data.errors)
  });
}

export const updateAccount = async (id, formValue, setError) => {
  await axios.put(`/api/v1/management/admins/${id}`, formValue)
  .then((response) => {
    Swal.fire(
      '更新完了',
      'アカウントの更新に成功しました',
      'success'
    )
    console.log(response);
  })
  .catch(error => {
    console.error(error);
    setError(error.response.data.errors)
  });
}