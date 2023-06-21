export const getOccupations = async (setOccupations) => {
  axios.get(`/api/v1/occupations`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setOccupations(res.data.occupations);
      }
    });
};

export const showOccupation = async (id, setOccupation) => {
  return await axios.get(`/api/v1/occupations/${id}`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setOccupation(res.data.occupation);
        return res.data.occupation;
      }
    });
};