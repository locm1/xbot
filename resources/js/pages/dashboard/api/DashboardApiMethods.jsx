import React, { useState, useEffect } from "react";

export const getReportUsers = async (setFriendCount, setBlockCount, params) => {
  axios.get('/api/v1/management/report/users', params)
  .then((response) => {
    const data = response.data;
    setFriendCount(data.users);
    setBlockCount(data.blocks);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getDemographic = async (setGenders, setBirthMonths, setPrefectures) => {
  axios.get('/api/v1/management/demographic')
  .then((response) => {
    const demographic = response.data.demographic;
    setGenders(Object.values(demographic.genders))
    setBirthMonths([{
      id: 1,
      label: "誕生月",
      color: "#f0bc74",
      values: demographic.birth_months
    }])
    setPrefectures(demographic.prefectures)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getReportAnalysis = async (setAnalyses) => {
  axios.get('/api/v1/management/report/user/analysis')
  .then((response) => {
    const data = response.data;
    const userAnalysis = [
      {
        id: 1,
        label: "友達総数",
        color: "#4D4AE8",
        values: data.users,
      },
      {
        id: 2,
        label: "ブロック数",
        color: "#FD8E7A",
        values: data.blocks,
      },
    ];
    setAnalyses(userAnalysis);
  })
  .catch(error => {
      console.error(error);
  });
};