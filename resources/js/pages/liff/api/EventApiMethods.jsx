export const getEvents = async (searchParams, setEvents) => {
  return await axios.get(`/api/v1/events`, searchParams)
  .then((response) => {
    const events = response.data.events;
    setEvents(events);
    console.log(events);
    return events;
  })
  .catch(error => {
      console.error(error);
  });
};

export const getEventsByUserId = async (userId, liffToken, setUserEvents) => {
  const params = {params: {liffToken: liffToken}}
  return await axios.get(`/api/v1/users/${userId}/event/reservations`, params)
  .then((response) => {
    const events = response.data.events
    setUserEvents(events);
    return events;
  })
  .catch(error => {
      console.error(error);
  });
};


export const eventReservation = async (id, userId, liffToken) => {
  const params = {liffToken: liffToken}
  return await axios.post(`/api/v1/users/${+userId}/events/${id}/reservations`, params)
  .then((response) => {
    const event = response.data.event
    console.log(event);
    return event;
  })
  .catch(error => {
      console.error(error);
      return error;
  });
};
