import React, { useState, useEffect } from "react";

export const getPrivilegeItems = async (id, setPrivilegeItems) => {
  await axios.get(`/api/v1/management/privileges/${id}/items`)
  .then((response) => {
    setPrivilegeItems(response.data.privilegeItems);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storePrivilegeItem = async (id, name, privilegeItems, setPrivilegeItems, setIsCreate, setError) => {
  await axios.post(`/api/v1/management/privileges/${id}/items`, {
    name: name
  })
  .then((response) => {
    const privilegeItem = response.data.privilegeItem;
    if (privilegeItems.length === 0) {
      setPrivilegeItems([{
        id: privilegeItem.id, privilege_id: id, name: privilegeItem.name
      }])
    } else if (privilegeItems.length >= 1) {
      console.log(privilegeItem);
      setPrivilegeItems([...privilegeItems, privilegeItem])
    }
    setIsCreate(false);
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.errors)
  });
};

export const updatePrivilegeItem = async (privilegeId, id, name, privilegeItems, setPrivilegeItems, setIsEdit, isEdit) => {
  return await axios.put(`/api/v1/management/privileges/${privilegeId}/items/${id}`, {
    name: name
  })
  .then((response) => {
    const newPrivilegeItem = {
      id: id,
      privilege_id: privilegeId,
      name: name
    }
    setPrivilegeItems(
      privilegeItems.map((privilegeItem) => (privilegeItem.id === id ? newPrivilegeItem : privilegeItem))
    );
    setIsEdit(!isEdit.isEdit)
  })
  .catch(error => {
      console.error(error);
  });
};


export const deletePrivilegeItem = async (privilegeId, id, deleteItem) => {
  await axios.delete(`/api/v1/management/privileges/${privilegeId}/items/${id}`)
  .then((response) => {
    deleteItem()
  })
  .catch(error => {
    console.error(error);
  });
};