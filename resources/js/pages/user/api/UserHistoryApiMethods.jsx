export const getUserVisitorHistories = async (id, setVisitorHistory) => {
  axios.get(`/api/v1/management/users/${id}/visitor-histories`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setVisitorHistory(res.data.visitor_histories);
      }
    });
};

export const getUserVisitorHistoryCount = async (id, setVisitCount) => {
  axios.get(`/api/v1/management/users/${id}/visitor-histories/count`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setVisitCount(res.data.visitor_histories_count);
      }
    });
};

export const getUserOrders = async (id, setOrders) => {
  axios.get(`/api/v1/management/users/${id}/orders`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const order = [];
          res.data.orders.forEach(history => {
            history.order_products.forEach(product => {
              order.push({
                "createdAt": product.created_at,
                "name": product.product.name,
                "price": product.product.price,
                "quantity": product.quantity,
              })
            })
          })
        setOrders(order);
      }
    });
};

export const getUserInviteHistories = async (id, setInviteHistories, setFromInvitedUser) => {
  axios.get(`/api/v1/management/users/${id}/invite-history`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const from_invited_user = res.data.from_invited_user;
        const newFromInvitedUser = (from_invited_user.length) ? from_invited_user : undefined;
        setInviteHistories(res.data.invite_histories);
        setFromInvitedUser(newFromInvitedUser);
        console.log(from_invited_user);
      }
    });
};

export const getUserReserveHistories = async (id, setReserves) => {
  axios.get(`/api/v1/management/users/${id}/reserve-history`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setReserves(res.data.reserve_histories.map(v => (
          {
            createdAt: v.created_at,
            name: v.product.name,
            quantity: v.quantity,
            deadline: v.deadline,
          }
        )));
      }
    });
};