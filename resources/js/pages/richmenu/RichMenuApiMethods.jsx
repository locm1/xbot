export const getRichMenus = async (setRichMenus) => {
    axios.get('/api/v1/management/rich-menus')
    .then((response) => {
      setRichMenus(response.data.RichMenus);
    })
    .catch(error => {
        console.error(error);
    });
  };
  
  export const storeRichMenu = async (RichMenu, storeComplete) => {
    axios.post('/api/v1/management/rich-menus/', RichMenu)
    .then((response) => {
      storeComplete();
      location.href = '/manage/RichMenu/list';
    })
    .catch(error => {
        console.error(error);
    });
  };
  
  export const showRichMenu = async (id, setRichMenu) => {
    axios.get(`/api/v1/management/rich-menus/${id}`)
    .then((response) => {
      setRichMenu(response.data.RichMenu);
      console.log(response.data.RichMenu);
    })
    .catch(error => {
        console.error(error);
    });
  };
  
  export const updateRichMenu = async (id, RichMenu, updateComplete) => {
    axios.put(`/api/v1/management/rich-menus/${id}`, RichMenu)
    .then((response) => {
      updateComplete();
    })
    .catch(error => {
        console.error(error);
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