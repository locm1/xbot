export const getInviteIncentives = async (params, setInviteIncentives, setLinks, setPaginate, setIsRendered) => {
  axios.get('/api/v1/management/invite-incentives', params)
  .then((response) => {
    const inviteIncentives = response.data.invite_incentives;
    setInviteIncentives({
      invite_incentives: inviteIncentives.invite_incentives.data,
      default_invite_incentive: inviteIncentives.default_invite_incentive
    });
    setLinks([...Array(inviteIncentives.invite_incentives.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: inviteIncentives.invite_incentives.current_page, 
      per_page: inviteIncentives.invite_incentives.per_page,
      from: inviteIncentives.invite_incentives.from,
      to: inviteIncentives.invite_incentives.to,
      total: inviteIncentives.invite_incentives.total,
    })
    setIsRendered(true)

  })
  .catch(error => {
      console.error(error);
  });
};

export const showInviteIncentive = async (id, setInviteIncentive, setIsDefault) => {
  axios.get(`/api/v1/management/invite-incentives/${id}`)
  .then((response) => {
    setInviteIncentive(response.data.invite_incentive);
    setIsDefault(response.data.default_invite_incentive.invite_incentive_id === response.data.invite_incentive.id);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeInviteIncentive = async (inviteIncentive, storeComplete, setError) => {
  return axios.post(`/api/v1/management/invite-incentives`, inviteIncentive)
  .then((response) => {
    storeComplete('登録', response.data.invite_incentive.id);
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};

export const updateInviteIncentive = async (id, inviteIncentive, storeComplete, setError) => {
  axios.put(`/api/v1/management/invite-incentives/${id}`, inviteIncentive)
  .then((response) => {
    storeComplete('更新', response.data.invite_incentive.id);
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};

export const deleteInviteIncentive = async (id, deleteComplete) => {
  axios.delete(`/api/v1/management/invite-incentives/${id}`)
  .then((response) => {
    deleteComplete(id);
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