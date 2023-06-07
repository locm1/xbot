export const getPrefectures = async (setPrefectures) => {
  return await axios.get('/api/v1/prefectures')
  .then((response) => {
    const prefectures = response.data.prefectures;
    setPrefectures(prefectures);
    return prefectures;
  })
  .catch(error => {
      console.error(error);
  });
};