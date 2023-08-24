export const savePhotoUri = (uri) => (dispatch) => {
  try {
    dispatch({
      type: "SAVE_PHOTO_URI",
      payload: uri,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const saveActualServiceAIT = (item) => (dispatch) => {
  try {
    dispatch({
      type: "SAVE_ACTUALSERVICEAIT",
      payload: item,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const saveActualPostFirebase = (item) => (dispatch) => {
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
  (item) => (dispatch) => {
    try {
      dispatch({
        type: "SAVE_ACTUALSERVICEAITLIST",
        payload: item,
      });
    } catch (error) {
      alert(error.message);
    }
  };
