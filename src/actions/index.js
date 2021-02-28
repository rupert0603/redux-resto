export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item    
  };
}

export const deleteItem = (item) => {
  return {
    type: 'DELETE_ITEM',
    payload: item    
  };
}

export const displayEditForm = (item) => {
  return {
    type: 'DISPLAY_EDIT_FORM',
    payload: item
  };
}

export const postEditData = (editFormData) => {
  return {
    type: 'POST_EDIT_DATA',
    payload: editFormData,     
  };
}

export const commitEditItemData = (itemData) => {
  return {
    type: 'COMMIT_EDIT_ITEM',
    payload: itemData
  };
}

export const changeFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    payload: filter
  };
}

export const displayAddNewItemForm = () => {
  return {
    type: 'DISPLAY_ADD_NEW_ITEM_FORM',
  };
};

export const postAddNewItemData = (addNewItemFormData) => {
  return {
    type: 'POST_ADD_NEW_ITEM_DATA',
    payload: addNewItemFormData,
  };
}

export const commitAddNewItemData = (itemData) => {
  return {
    type: 'COMMIT_ADD_NEW_ITEM',
    payload: itemData,
  };
}