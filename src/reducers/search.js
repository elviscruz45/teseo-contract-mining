const INITIAL_STATE = {
  approvalListNew: null,
};

export function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_APPROVALLISTNEW":
      return { ...state, approvalList: action.payload };
    default:
      return state;
  }
}
