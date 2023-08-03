const INITIAL_STATE = {
  approvalList: null,
};

export function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_APPROVALLIST":
      return { ...state, approvalList: action.payload };
    default:
      return state;
  }
}
