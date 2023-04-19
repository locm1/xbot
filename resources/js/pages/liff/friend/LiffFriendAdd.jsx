import React, { useState, useRef, useEffect } from "react";
import '@splidejs/splide/css';
import { Link, useHistory, Redirect, useLocation, useParams } from 'react-router-dom';
import liff from '@line/liff';

export default () => {
  const { userId, inviteIncentiveId } = useParams();

  const searchInviteeUsers = async (searchParams) => {
    return await axios.get(`/api/v1/invitee-users`, searchParams)
    .then((response) => {
      const invitee_users = response.data.invitee_users;
      console.log(invitee_users);
      return invitee_users;
    })
    .catch(error => {
        console.error(error);
    });
  };

  const storeInviteeUser = async (formValue) => {
    return await axios.post(`/api/v1/invite-incentive-job`, formValue)
    .then((response) => {
      console.log(response.data.invitee_user);
    })
    .catch(error => {
        console.error(error);
    });
  };

  useEffect(() => {
    const idToken = liff.getIDToken();
    const formValue = {
      token: idToken, inviter_user_id: userId,
      invite_incentive_id: inviteIncentiveId
    }
    const searchParams = {
      params: {token: idToken}
    };

    // 招待者テーブルから検索をかけ、存在しなかったら追加
    storeInviteeUser(formValue).then(response => location.href = "https://lin.ee/nGVYloK")
  }, []);

  return (
    <>
    </>
  );
};
