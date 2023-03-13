export const getPrefectures = async (setPrefectures) => {
  axios.get('/api/v1/prefectures')
  .then((response) => {
    setPrefectures(response.data.prefectures);
  })
  .catch(error => {
      console.error(error);
  });
};