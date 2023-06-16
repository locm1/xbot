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

export const storeSiteSetting = async (formValue) => {
  return await axios.post('/api/v1/site-settings', formValue, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    const siteSetting = response.data.site_setting;
    console.log(siteSetting);
    return siteSetting
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateSiteSetting = async (formValue) => {
  return await axios.post('/api/v1/site-settings', formValue, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    }
  })
  .then((response) => {
    const siteSetting = response.data.site_setting;
    console.log(siteSetting);
    return siteSetting
  })
  .catch(error => {
      console.error(error);
  });
};