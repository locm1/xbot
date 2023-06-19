import LogoAdmin from "@img/img/logo_admin.png";
import LogoLogin from "@img/img/logo_login.png";

export const getSiteSettings = async (setSetting) => {
  return await axios.get('/api/v1/site-settings')
  .then((response) => {
    const siteSetting = response.data.site_setting;
    const defaultSiteSetting = {
      logo_login_path: LogoLogin, logo_sidebar_path: LogoAdmin
    }
    const resutlSiteSetting = (siteSetting.length) ? siteSetting[0] : defaultSiteSetting;
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

export const updateSiteSetting = async (formValue, complete, setError) => {
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
    setError(error.response.data.errors)
      console.error(error);
  });
};