export const getReserveHistories = async (setReserveHistories) => {
  axios.get('/api/v1/management/reserve-histories')
  .then((response) => {
    setReserveHistories(response.data.reserve_histories.data);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateReserveHistory = async (id, status, setReserveHistories, reserveHistories, setModalOpen) => {
  axios.put(`/api/v1/management/reserve-histories/${id}`, {
    status: status
  })
  .then((response) => {
    setReserveHistories(
      reserveHistories.map((reserveHistory) => (reserveHistory.id === id ? { ...reserveHistory, status: status } : reserveHistory))
    );
    setModalOpen(false);
  })
  .catch(error => {
      console.error(error);
  });
};