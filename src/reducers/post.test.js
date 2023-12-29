import { post } from "./post";

describe("post reducer", () => {
  it("should handle SAVE_PHOTO_URI", () => {
    const initialState = {
      savePhotoUri: null,
    };
    const action = {
      type: "SAVE_PHOTO_URI",
      payload: "test-uri",
    };
    const expectedState = {
      savePhotoUri: "test-uri",
    };

    expect(post(initialState, action)).toEqual(expectedState);
  });

  it("should handle SAVE_ACTUALSERVICEAIT", () => {
    const initialState = {
      actualServiceAIT: null,
    };
    const action = {
      type: "SAVE_ACTUALSERVICEAIT",
      payload: "test-service",
    };
    const expectedState = {
      actualServiceAIT: "test-service",
    };

    expect(post(initialState, action)).toEqual(expectedState);
  });

  it("should handle SAVE_ACTUALPOSTFIREBASE", () => {
    const initialState = {
      ActualPostFirebase: null,
    };
    const action = {
      type: "SAVE_ACTUALPOSTFIREBASE",
      payload: "test-post",
    };
    const expectedState = {
      ActualPostFirebase: "test-post",
    };

    expect(post(initialState, action)).toEqual(expectedState);
  });

  it("should handle SAVE_ACTUALSERVICEAITLIST", () => {
    const initialState = {
      ActualServiceAITList: null,
    };
    const action = {
      type: "SAVE_ACTUALSERVICEAITLIST",
      payload: ["service1", "service2"],
    };
    const expectedState = {
      ActualServiceAITList: ["service1", "service2"],
    };

    expect(post(initialState, action)).toEqual(expectedState);
  });

  it("should handle SAVE_TOTALUSERS", () => {
    const initialState = {
      saveTotalUsers: null,
    };
    const action = {
      type: "SAVE_TOTALUSERS",
      payload: 10,
    };
    const expectedState = {
      saveTotalUsers: 10,
    };

    expect(post(initialState, action)).toEqual(expectedState);
  });

  it("should return the initial state for unknown action types", () => {
    const initialState = {
      savePhotoUri: null,
      actualServiceAIT: null,
      ActualPostFirebase: null,
      ActualServiceAITList: null,
      saveTotalUsers: null,
    };
    const action = {
      type: "UNKNOWN_ACTION",
      payload: "test",
    };

    expect(post(initialState, action)).toEqual(initialState);
  });
});
