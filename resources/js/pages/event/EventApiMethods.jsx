import axios from "axios"

export const GetAllEvents = (events, setEvents) => {
  axios
    .get(`/api/v1/management/event-calendars`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setEvents(res.data.events);
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