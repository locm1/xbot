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

export const showQuestionnaireEnabling = async (id, setQuestionnaireEnabling) => {
  return await axios.get(`/api/v1/questionnaire-enabling/${id}`)
  .then((response) => {
    const questionnaire_enabling = response.data.questionnaire_enabling;
    setQuestionnaireEnabling(questionnaire_enabling);
    console.log(questionnaire_enabling);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getUserInfoStatuses = async (setUserInfoStatuses) => {
  return await axios.get('/api/v1/user-info-statuses')
  .then((response) => {
    console.log(response.data.user_info_statuses);
    setUserInfoStatuses(response.data.user_info_statuses);
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