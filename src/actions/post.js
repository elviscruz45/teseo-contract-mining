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

export const saveActualPostFirebase = (item) => async (dispatch) => {
  try {
    dispatch({
      type: "SAVE_ACTUALPOSTFIREBASE",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const saveActualAITServicesFirebaseGlobalState =
  (item) => async (dispatch) => {
    try {
      dispatch({
        type: "SAVE_ACTUALSERVICEAIT",
        payload: item,
      });
    } catch (error) {
      alert(error.message);
    }
  };
