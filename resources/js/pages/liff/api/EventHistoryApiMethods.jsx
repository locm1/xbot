export const getEventHistoriesByUserId = async (userId, liffToken, setHistories) => {
  const params = {params: {liffToken: liffToken}}
  return await axios.get(`/api/v1/users/${userId}/event/reservations/history`, params)
  .then((response) => {
    const events = response.data.events
    console.log(events);
    setHistories(events);
    return events;
  })
  .catch(error => {
      console.error(error);
  });
};