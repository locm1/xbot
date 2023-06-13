import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Swal from "sweetalert2";

const completeSwal = () => {
  Swal.fire(
    '保存完了',
    '保存に成功しました',
    'success'
  )
}

export const getPrivileges = async (setPrivileges) => {
  axios.get('/api/v1/management/privileges')
  .then((response) => {
    setPrivileges(response.data.privileges);
    console.log(response.data.privileges);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storePrivileges = async (values, setError, setIsCreate) => {
  console.log(values);
  await axios.post('/api/v1/management/privileges', values)
  .then((response) => {
    setIsCreate(false)
    completeSwal();
    console.log(response);
  })
  .catch(error => {
    setError(error.response.data.errors)
    console.error(error);
  });
};

export const updatePrivileges = async (id, time, setIsUpdate, setIsTimeEditable) => {
  await axios.put(`/api/v1/management/privileges/${id}`, {
    visits_times: time
  })
  .then((response) => {
    setIsUpdate(true)
    setIsTimeEditable(false);
  })
  .catch(error => {
      console.error(error);
  });
};


export const deletePrivileges = async (id, deletePrivilege) => {
  await axios.delete(`/api/v1/management/privileges/${id}`)
  .then((response) => {
    deletePrivilege()
  })
  .catch(error => {
      console.error(error);
  });
};