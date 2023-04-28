export const getInviteMessage = async (userId, setMessages, setLink) => {
  axios.get(`/api/v1/users/${userId}/invites`)
  .then((response) => {
    const data = response.data;
    setMessages([{
      type: 'text',
      text: data.message
    }]);
    setLink(data.link)
    console.log([data.message]);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getInviterIncentives = async (userId, setInviterIncentives, setIsLoading) => {
  axios.get(`/api/v1/users/${userId}/inviter-incentives`)
  .then((response) => {
    setInviterIncentives(response.data.inviter_incentives)
    console.log(response.data.inviter_incentives);
    setIsLoading(false)
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false)
  });
};

export const getInviteeIncentives = async (userId, setInviteeIncentives) => {
  axios.get(`/api/v1/users/${userId}/invitee-incentives`)
  .then((response) => {
    setInviteeIncentives(response.data.invitee_incentives)
    console.log(response.data.invitee_incentives);
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