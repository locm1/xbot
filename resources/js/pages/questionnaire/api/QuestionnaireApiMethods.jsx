export const getQuestionnaires = async (setQuestionnaires) => {
  return await axios.get('/api/v1/management/questionnaires')
  .then((response) => {
    const questionnaires = response.data.questionnaires;
    setQuestionnaires(questionnaires);
    return questionnaires;
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeQuestionnaire = async (formValue, questionnaires, setQuestionnaires) => {
  await axios.post(`/api/v1/management/questionnaires`, formValue)
  .then((response) => {
    setQuestionnaires([...questionnaires, response.data.questionnaire]);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateQuestionnaire = async (id, formValue, setAlert) => {
  await axios.put(`/api/v1/management/questionnaires/${id}`, formValue)
  .then((response) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteQuestionnaire = async (id, completeDelete, setQuestionnaires, questionnaires) => {
  axios.delete(`/api/v1/management/questionnaires/${id}`)
  .then((response) => {
    completeDelete();
    setQuestionnaires(questionnaires.filter((questionnaire) => (questionnaire.id !== id)));
  })
  .catch(error => {
      console.error(error);
  });
};


export const sortQuestionnaire = async (id, formValue) => {
  await axios.put(`/api/v1/management/questionnaires/${id}/sort`, formValue)
  .then((response) => {
    const displayOrder = response.data.display_order;
    console.log(displayOrder);
  })
  .catch(error => {
      console.error(error);
  });
};