export const likePost = (uri) => (dispatch) => {
  try {
    dispatch({
      type: "LIKEPOST",
      payload: uri,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const unlikePost = (item) => (dispatch) => {
  try {
    dispatch({
      type: "UNLIKEPOST",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const comentaryPost = (uri) => (dispatch) => {
  try {
    dispatch({
      type: "COMENTARYPOST",
      payload: uri,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const EquipmentListUpper = (list) => (dispatch) => {
  try {
    dispatch({
      type: "EQUIPMENTLISTUPPER",
      payload: list,
    });
  } catch (error) {
    alert(error.message);
  }
};
export const saveTotalEventServiceAITList = (item) => (dispatch) => {
  try {
    dispatch({
      type: "SAVE_TOTALEVENTSERVICEAITLIST",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const resetPostPerPageHome = (item) => (dispatch) => {
  const newItem = item + 5;
  try {
    dispatch({
      type: "RESET_POSTPERPAGEHOME",
      payload: newItem,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const updateAITServicesDATA = (item) => (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_AITSERVICESDATA",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const update_approvalList = (firebase_uid) => (dispatch) => {
  dispatch({
    type: "UPDATE_APPROVALLIST",
    payload: firebase_uid,
  });
};
