import { Paths } from "@/paths";

export const getProductReservations = async (userId, setProductReservations, liffToken) => {
  axios.get(`/api/v1/users/${userId}/product/reservations`, {params: liffToken})
  .then((response) => {
    setProductReservations(response.data.product_reservations)
    console.log(response.data.product_reservations);
    //setIsLoading(false);
    //成功したらメール通知する処理
  })
  .catch(error => {
      console.error(error);
  });
};


export const searchProductReservations = async (userId, params, setProductReservations) => {
  axios.get(`/api/v1/users/${userId}/product/reservations`, params)
  .then((response) => {
    setProductReservations(response.data.product_reservations)
    console.log(response.data.product_reservations);
  })
  .catch(error => {
      console.error(error);
  });
};
export const storeProductReservation = async (userId, formValue) => {
  axios.post(`/api/v1/users/${userId}/product/reservations`, formValue)
  .then((response) => {
    console.log(response.data.product_reservation);
    location.href = Paths.LiffProductReservationComplete.path;
  })
  .catch(error => {
      console.error(error);
  });
};