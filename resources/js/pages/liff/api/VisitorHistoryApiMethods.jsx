export const getVisitorHistoryCount = async (userId, setVisitorCount) => {
  return await axios.get(`/api/v1/users/${userId}/visitor-histories/count`)
  .then((response) => {
    console.log(response.data.visitor_histories_count);
    setVisitorCount(response.data.visitor_histories_count)
  })
  .catch(error => {
      console.error(error);
  });
};