export const getInviteIncentives = async (setInviteIncentives, setDefaultInviteIncentive) => {
  axios.get('/api/v1/management/invite-incentives')
  .then((response) => {
    const inviteIncentives = response.data.invite_incentives;
    setInviteIncentives(inviteIncentives.invite_incentives);
    setDefaultInviteIncentive(inviteIncentives.default_invite_incentive)

  })
  .catch(error => {
      console.error(error);
  });
};

export const showInviteIncentive = async (id, setInviteIncentive) => {
  axios.get(`/api/v1/management/invite-incentives/${id}`)
  .then((response) => {
    setInviteIncentive(response.data.invite_incentive);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateInviteIncentive = async (id, inviteIncentive, updateComplete) => {
  axios.put(`/api/v1/management/invite-incentives/${id}`, inviteIncentive)
  .then((response) => {
    updateComplete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteInviteIncentive = async (id, deleteComplete, setInviteIncentives, inviteIncentives) => {
  axios.delete(`/api/v1/management/invite-incentives/${id}`)
  .then((response) => {
    deleteComplete();
    setInviteIncentives(inviteIncentives.filter((inviteIncentive) => (inviteIncentive.id !== id)));
  })
  .catch(error => {
      console.error(error);
  });
};

export const getInvitationUsers = async (id, setInvitationUsers, setOpenModal, openModal) => {
  await axios.get(`/api/v1/management/invitations/${id}/users`)
  .then((response) => {
    console.log(response.data.invitation_users);
    setInvitationUsers(response.data.invitation_users);
    setOpenModal(!openModal);
  })
  .catch(error => {
      console.error(error);
  });
};