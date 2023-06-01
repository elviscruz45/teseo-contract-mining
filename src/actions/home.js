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
