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