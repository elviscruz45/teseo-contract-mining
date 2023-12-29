import { profile } from "./profile";

describe("profile reducer", () => {
  it("should handle UPDATE_FIREBASEUSERNAME", () => {
    const initialState = { firebase_user_name: "" };
    const action = { type: "UPDATE_FIREBASEUSERNAME", payload: "JohnDoe" };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual({ firebase_user_name: "JohnDoe" });
  });

  it("should handle UPDATE_FIREBASEPHOTO", () => {
    const initialState = { user_photo: "" };
    const action = { type: "UPDATE_FIREBASEPHOTO", payload: "test-photo" };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual({ user_photo: "test-photo" });
  });

  it("should handle UPDATE_FIREBASEEMAIL", () => {
    const initialState = { email: "" };
    const action = {
      type: "UPDATE_FIREBASEEMAIL",
      payload: "test@example.com",
    };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual({ email: "test@example.com" });
  });

  it("should handle UPDATE_FIREBASEPROFILE", () => {
    const initialState = { profile: {} };
    const action = {
      type: "UPDATE_FIREBASEPROFILE",
      payload: { name: "John", age: 30 },
    };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual({ profile: { name: "John", age: 30 } });
  });

  it("should handle UPDATE_FIREBASEID", () => {
    const initialState = { uid: "" };
    const action = { type: "UPDATE_FIREBASEID", payload: "test-uid" };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual({ uid: "test-uid" });
  });

  it("should handle UPDATE_APPROVALQUANTITY", () => {
    const initialState = { approvalQuantity: 0 };
    const action = { type: "UPDATE_APPROVALQUANTITY", payload: 5 };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual({ approvalQuantity: 5 });
  });

  it("should return the initial state for unknown action types", () => {
    const initialState = {
      firebase_user_name: "",
      user_photo: "",
      email: "",
      profile: {},
      uid: "",
      approvalQuantity: 0,
    };
    const action = { type: "UNKNOWN_ACTION" };
    const nextState = profile(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});
