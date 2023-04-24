import Swal from "sweetalert2";

export const getPostages = async (setPostages, setIsUpdate) => {
  axios.get('/api/v1/management/postages')
  .then((response) => {
    const postages = response.data.postages;
    console.log(postages);
    if (postages.length == 0) {
      const prefectures = [
        "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
        "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
        "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
        "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
        "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
        "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
        "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
      ];
      setPostages(
        prefectures.map(
          (prefecture, index) => ({id: index + 1, prefecture_id: index + 1, postage: '', name: prefecture})
        )
      )
      setIsUpdate(false);
    } else {
      setPostages(
        postages.map(
          (postage, index) => ({id: postage.id, prefecture_id: postage.prefecture_id, postage: postage.postage, name: postage.prefecture.name})
        )
      );
      setIsUpdate(true);
    }
  })
  .catch(error => {
      console.error(error);
  });
};


export const storePostage = async (postages) => {
  await axios.post(`/api/v1/management/postages`, {postages: postages})
  .then((response) => {
    console.log(response.data.postages);
    // Swal.fire('保存成功', `送料の保存に成功しました。`, 'success');
  })
  .catch(error => {
      console.error(error);
  });
};


export const updatePostage = async (postages) => {
  await axios.put(`/api/v1/management/postages`, {postages: postages})
  .then((response) => {
    console.log(response.data.postages);
    // Swal.fire('更新成功', `送料の更新に成功しました。`, 'success');
  })
  .catch(error => {
      console.error(error);
  });
};