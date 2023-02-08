export const storeQuestionnaireItem = async (id, formValue, items, setItems) => {
  await axios.post(`/api/v1/management/questionnaires/${id}/items`, formValue)
  .then((response) => {
    setItems([...items, response.data.questionnaire_item])
  })
  .catch(error => {
      console.error(error);
  });
};


export const updateQuestionnaireItem = async (questionnaireId, formValue, id, items, setItems) => {
  await axios.put(`/api/v1/management/questionnaires/${questionnaireId}/items/${id}`, formValue)
  .then((response) => {
    const currentItem = items.filter(item => (item.id === id))[0]
    currentItem.name = response.data.questionnaire_item.name
    setItems(
      items.map((item) => (item.id === id ? currentItem : item))
    );
  })
  .catch(error => {
      console.error(error);
  });
};


export const deleteQuestionnaireItem = async (questionnaireId, id, items, setItems) => {
  await axios.delete(`/api/v1/management/questionnaires/${questionnaireId}/items/${id}`)
  .then((response) => {
    setItems(items.filter((item) => (item.id !== id)));
  })
  .catch(error => {
      console.error(error);
  });
};