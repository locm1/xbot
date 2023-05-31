import Swal from "sweetalert2";

export const getCards = async (userId, payjp_customer_id, setCreditCards) => {
  const searchParams = {
    params: {payjp_customer_id: payjp_customer_id}
  };
  return await axios.get(`/api/v1/users/${userId}/cards`, searchParams)
  .then((response) => {
    console.log(response.data.cards);
    setCreditCards(response.data.cards);
  })
  .catch(error => {
      console.error(error);
  });
};

export const showCard = async (userId, payjp_customer_id, cardId, setCard) => {
  const searchParams = {
    params: {payjp_customer_id: payjp_customer_id}
  };
  return await axios.get(`/api/v1/users/${userId}/cards/${cardId}`, searchParams)
  .then((response) => {
    console.log(response.data.card);
    setCard(response.data.card);
    return response.data.card;
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeCard = async (userId, formValue) => {
  return await axios.post(`/api/v1/users/${userId}/cards`, formValue)
  .then((response) => {
    console.log(response.data.card);
    return response.data.card;
  })
  .catch(error => {
    Swal.fire(`エラー`, 'カードが正常に登録できませんでした。', 'error')
      console.error(error);
  });
};