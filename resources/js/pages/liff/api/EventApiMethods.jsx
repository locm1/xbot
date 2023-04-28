export const getEvents = async (searchParams, setEvents) => {
  return await axios.get(`/api/v1/events`, searchParams)
  .then((response) => {
    setEvents(response.data.events);
    console.log(response.data.events);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getEventsByUserId = async (userId, setUserEvents, setIsLoading) => {
  return await axios.get(`/api/v1/users/${userId}/event/reservations`)
  .then((response) => {
    setUserEvents(response.data.events);
    setIsLoading(false)
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false)
  });
};


export const eventReservation = async (id, formValue, completeDelete, updateEvents, setEvents, setUserEvents, userEvents, failedReservation) => {
  return await axios.post(`/api/v1/events/${id}/reservations`, formValue)
  .then((response) => {
    const event = response.data.event
    console.log(event);
    setEvents(updateEvents(event, id))
    setUserEvents([...userEvents, event])
    completeDelete();
  })
  .catch(error => {
      console.error(error);
      failedReservation(error.response.data.message)
  });
};
