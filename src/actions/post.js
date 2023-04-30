export const savePhotoUri = (uri) => async (dispatch) => {
  try {
    dispatch({
      type: "SAVE_PHOTO_URI",
      payload: uri,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const saveActualEquipment = (item) => async (dispatch) => {
  try {
    dispatch({
      type: "SAVE_ACTUALEQUIPMENT",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};
