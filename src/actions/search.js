export const saveApprovalListnew = (approval) => (dispatch) => {
  dispatch({
    type: "SAVE_APPROVALLISTNEW",
    payload: approval,
  });
};
