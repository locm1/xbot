export const getGreetingMessageWithQuestionnaires = async (setQreetingMessageWithQuestionnaire, setIsQuestionnaireAnswerButton) => {
  axios.get(`/api/v1/management/greeting-messages/questionnaires`)
  .then((response) => {
    const greeting_message_with_questionnaires = response.data.greeting_message_with_questionnaires;
    console.log(greeting_message_with_questionnaires);
    setQreetingMessageWithQuestionnaire(greeting_message_with_questionnaires);

    if (greeting_message_with_questionnaires[0].is_questionnaire == 1) {
      setIsQuestionnaireAnswerButton(true);
    } else {
      setIsQuestionnaireAnswerButton(false);
    }

  })
  .catch(error => {
      console.error(error);
  });
};

export const storeGreetingMessageWithQuestionnaires = async (formData) => {
  axios.post(`/api/v1/management/greeting-messages/questionnaires`, formData)
  .then((response) => {
    console.log(response.data.greeting_message_with_questionnaire);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateGreetingMessageWithQuestionnaires = async (id, formData) => {
  axios.put(`/api/v1/management/greeting-messages/questionnaires/${id}`, formData)
  .then((response) => {
    console.log(response.data.greeting_message_with_questionnaire);
  })
  .catch(error => {
      console.error(error);
  });
};
