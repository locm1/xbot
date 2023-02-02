import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export const getPrivileges = async (setPrivileges) => {
  axios.get('/api/v1/management/privileges')
  .then((response) => {
    setPrivileges(response.data.privileges);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storePrivileges = async (time, privileges, setPrivileges, setIsCreate) => {
  await axios.post('/api/v1/management/privileges', {
    visits_times: time
  })
  .then((response) => {
      console.log(response);
      setPrivileges([...privileges, response.data.privilege]);
      setIsCreate(false);
  })
  .catch(error => {
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