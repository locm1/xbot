export const getSegmentTemplates = async (params, setSegmentTemplate) => {
  axios.get('/api/v1/management/segment-template')
  .then((response) => {
    setSegmentTemplate(response.data.segmentTemplate);
    console.log(response.data.segmentTemplate);
  })
  .catch(error => {
      console.error(error);
  });
};