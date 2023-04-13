import Cookies from 'js-cookie';

export const getQuestionnaires = async (setQuestionnaires) => {
  return await axios.get('/api/v1/questionnaires')
  .then((response) => {
    const questionnaires = response.data.questionnaires;
    console.log(questionnaires);
    setQuestionnaires(
      questionnaires.map(questionnaire => {
        return { ...questionnaire, answer: '' }
      })
    )
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeQuestionnaireAnswers = async (userId, questionnaires, setQuestionnaireErrors, setIsLoading, onSave) => {
  return await axios.post(`/api/v1/users/${userId}/user-deliveryaddress-questionnaireanswers`, questionnaires)
  .then((response) => {
    setIsLoading(false)
    const questionnaire_answers = response.data.questionnaire_answers;
    console.log(questionnaire_answers);
    onSave();
  })
  .catch(error => {
    setIsLoading(false)
    console.error(error);
    setQuestionnaireErrors(error.response.data.errors)
  });
};