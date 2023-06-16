import axios from "axios"

export const GetAllEvents = (events, setEvents) => {
  axios.get(`/api/v1/management/event-calendars`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setEvents(res.data.events);
        console.log(res.data.events);
      }
    });
}

export const UpdateEvent = async(id, event) => {
  await axios
  .put(`/api/v1/management/event-calendars/${id}`, event)
  .then((res) => {
  })
  .catch(error => {
  });
}

export const CreateEvent = async(event) => {
  return await axios
  .post(`/api/v1/management/event-calendars`, event)
  .then((res) => {
    return {
      result: 'success',
      res
    }
  })
  .catch(error => {
    return {
      result: 'failed',
      errors: error.response.data.errors
    }
  });
}

export const DeleteEvent = async(id) => {
  await axios
  .delete(`/api/v1/management/event-calendars/${id}`)
  .then((res) => {
  })
  .catch(error => {
  });
}

export const GetEvents = (params, setEvents, setLinks, setPaginate, setIsRendered) => {
  axios.get(`/api/v1/management/events`, params)
  .then((res) => {
    if(res.status !== 200) {
      throw new Error("APIが正しく取得されませんでした");
    } else {
      const events = res.data.events;
      setEvents(events.data);
      setLinks([...Array(events.last_page)].map((_, i) => i + 1))
      setPaginate({
        current_page: events.current_page, 
        per_page: events.per_page,
        from: events.from,
        to: events.to,
        total: events.total,
      })
      setIsRendered(true)
    }
  });
}

export const GetEventAllUsers = async (params, setEvents, setLinks, setPaginate) => {
  return await axios.get(`/api/v1/management/event/users`, params)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const event_users = res.data.event_users;
        setEvents(event_users.data);
        setLinks([...Array(event_users.last_page)].map((_, i) => i + 1))
        setPaginate({
          current_page: event_users.current_page, 
          per_page: event_users.per_page,
          from: event_users.from,
          to: event_users.to,
          total: event_users.total,
        })
        return event_users;
      }
    });
}

export const GetEventUsers = (id, setUsers) => {
  axios.get(`/api/v1/management/events/${id}/users`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setUsers(res.data.event_users);
        console.log(res.data.event_users);
      }
    });
}