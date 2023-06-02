export const getInviterIncentiveUsers = async (id, setInviterIncentiveUsers) => {
  axios.get(`/api/v1/management/invite-incentives/${id}/inviter-users`)
  .then((response) => {
    setInviterIncentiveUsers(response.data.inviter_incentive_users);

  })
  .catch(error => {
      console.error(error);
  });
};

export const getInviteeIncentiveUsers = async (id, setInviteeIncentiveUsers) => {
  axios.get(`/api/v1/management/invite-incentives/${id}/invitee-users`)
  .then((response) => {
    console.log(response.data.invitee_incentive_users);
    setInviteeIncentiveUsers(response.data.invitee_incentive_users);

  })
  .catch(error => {
      console.error(error);
  });
};