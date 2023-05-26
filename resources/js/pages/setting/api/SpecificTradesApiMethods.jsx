import Swal from "sweetalert2";

export const getSpecificTrades = async (setSpecificTrades) => {
  axios.get(`/api/v1/management/specific-trades`)
    .then((response) => {
      const specificTrades = response.data.specific_trades;
      setSpecificTrades(specificTrades.map(specificTrade => ({ ...specificTrade, display_id: specificTrade.id })))
    })
    .catch(error => {
        console.error(error);
    });
};


export const storeSpecificTrades = async(SpecificTrades, deleteSpecificTradeIds) => {
  const request = {
    specific_trades: SpecificTrades,
    delete_specific_trade_ids: deleteSpecificTradeIds
  }
  await axios.post('/api/v1/management/specific-trades', request)
  .then((res) => {
      console.log(res.data.specific);
      Swal.fire(
        '保存完了',
        '特定商取引法の保存に成功しました',
        'success'
      )
  })
  .catch(error => {
      console.error(error);
  });
}

export const updateSpecificTrades = async () => {
  await axios.put(`/api/v1/management/specific-trades/${specificTradeId}`, formValue)
  .then((res) => {
      console.log(res);
      const currentSpecific = SpecificTrades.find(specific => specific.id == specificTradeId)
      currentSpecific.title = formValue.title
      currentSpecific.content = formValue.content
      setSpecificTrades(SpecificTrades.map(specific => specific.id == specificTradeId ? currentSpecific : specific))
      setIsOpen(false)
      Swal.fire(
        '更新完了',
        '特定商取引法の更新に成功しました',
        'success'
      )
  })
  .catch(error => {
      console.error(error);
  });
}