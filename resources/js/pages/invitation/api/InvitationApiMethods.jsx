export const getInvitations = async (setInvitations) => {
  axios.get('/api/v1/management/invitations')
  .then((response) => {
    setInvitations(response.data.invitations.data);
  })
  .catch(error => {
      console.error(error);
  });
};

export const showInvitation = async (id, setInvitation) => {
  axios.get(`/api/v1/management/invitations/${id}`)
  .then((response) => {
    setInvitation(response.data.invitation);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateInvitation = async (id, invitation, updateComplete) => {
  axios.put(`/api/v1/management/invitations/${id}`, invitation)
  .then((response) => {
    updateComplete();
  })
  .catch(error => {
      console.error(error);
  });
};