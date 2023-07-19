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
  const itemNew = item + 10;
  try {
    dispatch({
      type: "RESET_POSTPERPAGEHOME",
      payload: itemNew,
    });
  } catch (error) {
    alert(error.message);
  }
};
