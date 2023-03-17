export const getRichMenus = async (setRichMenus) => {
    axios.get('/api/v1/management/rich-menus')
    .then((response) => {
      setRichMenus(response.data.RichMenus);
    })
    .catch(error => {
        console.error(error);
    });
  };
  
  export const storeRichMenu = async (formData) => {
    return await axios.post(`/api/v1/management/rich-menus/`, formData)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return 'failed';
    });
  };
  
  export const showRichMenu = async (id, setRichMenu) => {
    return await axios.get(`/api/v1/management/rich-menus/${id}`)
    .then((response) => {
      setRichMenu(response.data);
      return response.data;
    })
    .catch(error => {
        console.error(error);
    });
  };

  export const getImage = async (id, setImage, setImagePath) => {
    axios.get(`/api/v1/management/rich-menu-image/${id}`, {responseType: 'blob',})
    .then((response) => {
	    const file = new File([response.data], "file1.png", { type: "image/png" })
      setImagePath(URL.createObjectURL(file));
      setImage(file);
    })
    .catch(error => {
        console.error(error);
    });
  };
  
  export const updateRichMenu = async (id, formData) => {
    return await axios.post(`/api/v1/management/rich-menus/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      }
    })
    .then((response) => {
      console.log(response)
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return 'failed';
    });
  };
  
  export const searchRichMenus = async (params, setRichMenus) => {
    axios.get('/api/v1/management/rich-menus', params)
    .then((response) => {
      setRichMenus(response.data.RichMenus);
    })
    .catch(error => {
        console.error(error);
    });
  };
  
  export const deleteRichMenu = async (id, deleteComplete, setRichMenus, RichMenus) => {
    axios.delete(`/api/v1/management/rich-menus/${id}`)
    .then((response) => {
      deleteComplete();
      setRichMenus(RichMenus.filter((RichMenu) => (RichMenu.id !== id)));
    })
    .catch(error => {
        console.error(error);
    });
  };

  export const setDefaultRichMenu = async (id) => {
    return await axios.post(`/api/v1/management/rich-menu-set-default/${id}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return 'failed';
    });
  }