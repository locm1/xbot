export const getPages = async (setPages) => {
  axios.get('/api/v1/management/pages')
  .then((response) => {
    setPages(response.data.pages)
  })
  .catch(error => {
      console.error(error);
  });
};

export const updatePages = async (pages, updateComplete) => {
  axios.put('/api/v1/management/pages', {pages: pages})
  .then((response) => {
    updateComplete()
  })
  .catch(error => {
      console.error(error);
  });
};