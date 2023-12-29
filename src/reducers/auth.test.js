import { auth } from "./auth";

describe("auth reducer", () => {
  it("should handle UPDATE_FIREBASEUSERUID action", () => {
    const initialState = {
      firebase_user_uid: null,
    };

    const action = {
      type: "UPDATE_FIREBASEUSERUID",
      payload: "test-uid",
    };

    const expectedState = {
      firebase_user_uid: "test-uid",
    };

    const newState = auth(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should return the initial state for unknown action types", () => {
    const initialState = {
      firebase_user_uid: null,
    };

    const action = {
      type: "UNKNOWN_ACTION",
      payload: "test-uid",
    };

    const newState = auth(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
