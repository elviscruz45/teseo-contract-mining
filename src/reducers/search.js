const INITIAL_STATE = {
  approvalListNew: null,
};

export function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_APPROVALLISTNEW":
      return { ...state, approvalListNew: action.payload };
    default:
      return state;
  }
}
