export const likePost = (uri) => async (dispatch) => {
  try {
    dispatch({
      type: "LIKEPOST",
      payload: uri,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const unlikePost = (item) => async (dispatch) => {
  try {
    dispatch({
      type: "UNLIKEPOST",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const comentaryPost = (uri) => async (dispatch) => {
  try {
    dispatch({
      type: "COMENTARYPOST",
      payload: uri,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const EquipmentListUpper = (list) => async (dispatch) => {
  try {
    dispatch({
      type: "EQUIPMENTLISTUPPER",
      payload: list,
    });
  } catch (error) {
    alert(error.message);
  }
};
export const saveTotalEventServiceAITList = (item) => async (dispatch) => {
  try {
    dispatch({
      type: "SAVE_TOTALEVENTSERVICEAITLIST",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const resetPostPerPageHome = (item) => async (dispatch) => {
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

export const updateAITServicesDATA = (item) => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_AITSERVICESDATA",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};
