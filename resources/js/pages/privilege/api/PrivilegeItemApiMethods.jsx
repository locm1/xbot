import React, { useState, useEffect } from "react";

export const storePrivilegeItem = async (id, name, privilegeItems, setPrivilegeItems, setIsCreate) => {
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
  });
};

export const updatePrivilegeItem = async (privilegeId, id, name, privilegeItems, setPrivilegeItems, setIsEdit, setPrivileges, privileges) => {
  await axios.put(`/api/v1/management/privileges/${privilegeId}/items/${id}`, {
    name: name
  })
  .then((response) => {
    const currentPrivilegeItem = privileges.filter(privilege => (privilege.id === privilegeId))[0]
    const newPrivilegeItem = {
      id: id,
      privilege_id: privilegeId,
      name: name
    }
    setPrivilegeItems(
      privilegeItems.map((privilegeItem) => (privilegeItem.id === id ? newPrivilegeItem : privilegeItem))
    );

    currentPrivilegeItem.privilege_items = newPrivilegeItem;
    setPrivileges(
      privileges.map((privilege) => (privilege.id === id ? currentPrivilegeItem : privilege))
    )
    setIsEdit(false)
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