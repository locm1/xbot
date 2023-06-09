export const getInviteMessage = async (userId, setMessage, setLink, idToken) => {
  return await axios.get(`/api/v1/users/${userId}/invites`, {params: {liffToken: idToken}})
  .then((response) => {
    const data = response.data;
    setMessage(data.message);
    setLink(data.link)
    console.log(data);
    return data;
  })
  .catch(error => {
      console.error(error);
  });
};

export const getInviterIncentives = async (userId, setInviterIncentives, data) => {
  return await axios.get(`/api/v1/users/${userId}/inviter-incentives`, {params: data})
  .then((response) => {
    const inviter_incentives = response.data.inviter_incentives
    setInviterIncentives(inviter_incentives)
    console.log(inviter_incentives);
    return inviter_incentives;
  })
  .catch(error => {
      console.error(error);
  });
};

export const getInviteeIncentives = async (userId, setInviteeIncentives, data) => {
  return await axios.get(`/api/v1/users/${userId}/invitee-incentives`, {params: data})
  .then((response) => {
    const invitee_incentives = response.data.invitee_incentives;
    setInviteeIncentives(invitee_incentives);
    return invitee_incentives;
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateInviterIncentives = async (userId, id, formValue, inviterIncentives, setInviterIncentives) => {
  axios.put(`/api/v1/users/${userId}/inviter-incentives/${id}`, formValue)
  .then((response) => {
    console.log(response.data.inviter_incentive);
    setInviterIncentives(inviterIncentives.filter(inviterIncentive => inviterIncentive.id !== id))
  })
  .catch(error => {
      console.error(error);
  });
};


export const updateInviteeIncentives = async (userId, id, formValue, inviteeIncentives, setInviteeIncentives) => {
  axios.put(`/api/v1/users/${userId}/invitee-incentives/${id}`, formValue)
  .then((response) => {
    console.log(response.data.invitee_incentive);
    setInviteeIncentives(inviteeIncentives.filter(inviteeIncentive => inviteeIncentive.id !== id))
  })
  .catch(error => {
      console.error(error);
  });
};