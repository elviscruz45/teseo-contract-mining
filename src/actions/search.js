export const saveApprovalList = (approval) => (dispatch) => {
  dispatch({
    type: "SAVE_APPROVALLIST",
    payload: approval,
  });
};
