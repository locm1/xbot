import Swal from "sweetalert2";

export const getQuestionnaires = async (setQuestionnaires, setIsRendered) => {
  return await axios.get('/api/v1/management/questionnaires')
  .then((response) => {
    const questionnaires = response.data.questionnaires;
    setQuestionnaires(questionnaires);
    console.log(questionnaires);
    setIsRendered(true)
    return questionnaires;
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeQuestionnaire = async (formValue, storeComplete, setError) => {
  await axios.post(`/api/v1/management/questionnaires`, formValue)
  .then((response) => {
    const questionnaire = response.data.questionnaire;
    Swal.fire(
      '保存完了',
      'アンケートの保存に成功しました',
      'success'
    ).then(result => {
      if (result.isConfirmed) {
        storeComplete(questionnaire.id)
      }
    })
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};


export const showQuestionnaire = async (id, setQuestionnaire, setQuestionnaireItems) => {
  await axios.get(`/api/v1/management/questionnaires/${id}`)
  .then((response) => {
    const questionnaire = response.data.questionnaire
    setQuestionnaire(questionnaire);
    setQuestionnaireItems(questionnaire.questionnaire_items.map(item => ({ ...item, display_id: item.id })));
  })
  .catch(error => {
      console.error(error);
  });
};


export const updateQuestionnaire = async (id, formValue, setError) => {
  return await axios.put(`/api/v1/management/questionnaires/${id}`, formValue)
  .then((response) => {
    Swal.fire(
      '保存完了',
      'アンケートの保存に成功しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
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