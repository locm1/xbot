export const getQuestionnaires = async (setQuestionnaires) => {
  return await axios.get('/api/v1/questionnaires')
  .then((response) => {
    const questionnaires = response.data.questionnaires;
    setQuestionnaires(questionnaires);
    console.log(response.data.questionnaires);
  })
  .catch(error => {
      console.error(error);
  });
};