export const getQuestionnaires = async (setQuestionnaires) => {
  await axios.get('/api/v1/management/questionnaires')
  .then((response) => {
    console.log(response.data.questionnaires);
    setQuestionnaires(response.data.questionnaires);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeQuestionnaire = async (formValue, questionnaires, setQuestionnaires) => {
  axios.post(`/api/v1/management/questionnaires`, formValue)
  .then((response) => {
    setQuestionnaires([...questionnaires, response.data.questionnaire]);
  })
  .catch(error => {
      console.error(error);
  });
};