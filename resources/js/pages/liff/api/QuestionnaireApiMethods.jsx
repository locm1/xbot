import Cookies from 'js-cookie';

export const getQuestionnaires = async (setQuestionnaires) => {
  return await axios.get('/api/v1/questionnaires')
  .then((response) => {
    const questionnaires = response.data.questionnaires;
    setQuestionnaires(
      questionnaires.map(questionnaire => {
        if (questionnaire.type == 1 || questionnaire.type == 2 || questionnaire.type == 4) {
          return { ...questionnaire, answer: '' }
        } else {
          return { ...questionnaire, answer: questionnaire.questionnaire_items[0] ? questionnaire.questionnaire_items[0].name: '' }
        }
      })
    )
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeQuestionnaireAnswers = async (userId, questionnaires) => {
  return await axios.post(`/api/v1/users/${userId}/questionnaire-answers`, questionnaires)
  .then((response) => {
    const questionnaire_answers = response.data.questionnaire_answers;
    console.log(questionnaire_answers);
    const currentPage = Cookies.get('current_page')
    location.href = (currentPage == 'cart') ? '/checkout' : '/questionnaire/complete'
  })
  .catch(error => {
      console.error(error);
  });
};