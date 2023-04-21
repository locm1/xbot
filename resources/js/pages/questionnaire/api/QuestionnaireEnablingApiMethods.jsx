import Swal from "sweetalert2";

export const showQuestionnaireEnabling = async (id, setQuestionnaireEnabling, setIsValid, questionnaire) => {
  return await axios.get(`/api/v1/management/questionnaire-enabling/${id}`)
  .then((response) => {
    const questionnaire_enabling = response.data.questionnaire_enabling;
    setQuestionnaireEnabling(questionnaire_enabling);
    console.log(questionnaire_enabling);

    if (questionnaire == 'questionnaire') {
      setIsValid(questionnaire_enabling.is_questionnaire_enabled == 1 ? true : false)
    } else {
      setIsValid(questionnaire_enabling.is_default_questionnaire_enabled == 1 ? true : false)
    }
  })
  .catch(error => {
      console.error(error);
  });
};


export const updateQuestionnaireEnabling = async (id, formValue) => {
  return await axios.put(`/api/v1/management/questionnaire-enabling/${id}`, formValue)
  .then((response) => {
    console.log(response.data.questionnaire_enabling);
    Swal.fire(
      '更新完了',
      'アンケート有効設定の更新に成功しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
  });
};