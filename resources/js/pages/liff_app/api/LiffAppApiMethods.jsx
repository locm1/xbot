export const getTokenAndLiffApps = async (setApps) => {
  axios.get('/api/v1/management/access-token')
  .then((response) => {
    getLiffApps(setApps, response.data.access_token)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getLiffApps = async (setApps, token) => {
  axios.get('https://api.line.me/liff/v1/apps', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then((response) => {
    setApps(response.data.apps);
  })
  .catch(error => {
      console.error(error);
  });
};