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

export const showEvent = async (id, setEvent) => {
  return await axios.get(`/api/v1/events/${id}`)
  .then((response) => {
    const event = response.data.event
    console.log(event);
    setEvent(event);
    return event;
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
    console.log(events);
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

export const deleteEventReservation = async (id, userId, liffToken) => {
  const params = {liffToken: liffToken}
  return await axios.delete(`/api/v1/users/${+userId}/events/${id}/reservations`, {data: params})
  .then((response) => {
    console.log(response);
    return response.data
  })
  .catch(error => {
      console.error(error);
      return error;
  });
};
