export const getSiteSettings = async (setSetting) => {
  return await axios.get('/api/v1/site-settings')
  .then((response) => {
    const siteSetting = response.data.site_setting;
    const resutlSiteSetting = (siteSetting.length) ? siteSetting[0] : {logo_login_path: '', logo_sidebar_path: ''};
    setSetting(resutlSiteSetting);
    return resutlSiteSetting
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeSiteSetting = async (formValue, complete, setError) => {
  return await axios.post('/api/v1/site-settings', formValue, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    const siteSetting = response.data.site_setting;
    console.log(siteSetting);
    complete();
    return siteSetting
  })
  .catch(error => {
    setError(error.response.data.errors)
    console.error(error);
  });
};

export const updateSiteSetting = async (formValue, complete) => {
  return await axios.post('/api/v1/site-settings', formValue, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    }
  })
  .then((response) => {
    const siteSetting = response.data.site_setting;
    console.log(siteSetting);
    complete();
    return siteSetting
  })
  .catch(error => {
      console.error(error);
  });
};