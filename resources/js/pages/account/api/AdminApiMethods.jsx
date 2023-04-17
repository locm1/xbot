export const getAccounts = async (params, setAccounts, setLinks, setPaginate) => {
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
  })
  .catch(error => {
      console.error(error);
  });
};