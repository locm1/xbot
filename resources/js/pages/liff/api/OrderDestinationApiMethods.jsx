import { Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";
import { Paths } from "@/paths";

export const getSelectOrderDestination = async (userId, setDeliveryAddress) => {
  return await axios.get(`/api/v1/users/${userId}/selected-destination`)
  .then((response) => {
    const order_destination = response.data.order_destination;
    setDeliveryAddress(response.data.order_destination);

    if (order_destination == null) {
      const new_order_destination = {
        first_name: '', first_name_kana: '', last_name: '', last_name_kana: '',
        zipcode: '', prefecture: '', city: '', address: '', building_name: '', 
        tel: '', is_selected: ''
      }
      setDeliveryAddress(new_order_destination);
      return new_order_destination;
    } else {
      setDeliveryAddress(order_destination);
      return order_destination;
    }
  })
  .catch(error => {
      console.error(error);
  });
};

export const getOrderDestinations = async (userId, setDeliveryAddresses, setSelectId) => {
  return await axios.get(`/api/v1/users/${userId}/destinations`)
  .then((response) => {
    const order_destinations = response.data.order_destinations;
    setDeliveryAddresses(order_destinations);
    const selectAddress = order_destinations.find((order_destination) => order_destination.is_selected == 1);
    console.log(selectAddress);
    setSelectId(selectAddress.id)
  })
  .catch(error => {
      console.error(error);
  });
};

export const showOrderDestination = async (userId, id, setDeliveryAddress) => {
  return await axios.get(`/api/v1/users/${userId}/destinations/${id}`)
  .then((response) => {
    const order_destination = response.data.order_destination;
    if (order_destination.building_name) {
      const building_name_split = order_destination.building_name.split(' ');
      setDeliveryAddress({...order_destination, building_name: building_name_split[0], room_number: building_name_split[1]});
    } else {
      setDeliveryAddress({...order_destination, room_number: ''});
    }
    console.log(order_destination);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeOrderDestination = async (userId, formValue, location, setErrors) => {
  await axios.post(`/api/v1/users/${userId}/destinations`, formValue)
  .then((response) => {
    if (location == '/checkout/address') {
      window.location.href = Paths.LiffCheckoutDestinations.path
    }
    console.log(response.data.order_destination);
  })
  .catch(error => {
      console.error(error);
      setErrors(error.response.data.errors)
  });
};

export const updateOrderDestination = async (userId, id, formValue, updateComplete, setErrors) => {
  return await axios.put(`/api/v1/users/${userId}/destinations/${id}`, formValue)
  .then((response) => {
    console.log(response.data.order_destination);
    updateComplete();
  })
  .catch(error => {
      console.error(error);
      setErrors(error.response.data.errors)
  });
};

export const updateOrderDestinations = async (userId) => {
  return await axios.put(`/api/v1/users/${userId}/destinations`)
  .then((response) => {
    console.log(response.data.order_destination);
  })
  .catch(error => {
      console.error(error);
  });
};