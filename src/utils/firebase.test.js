const firebaseConfig = {
  apiKey: "AIzaSyD12JVsdmR1IMXdbtW3EXtWxYzgAsD07MI",
  authDomain: "teseo-app-81d77.firebaseapp.com",
  projectId: "teseo-app-81d77",
  storageBucket: "teseo-app-81d77.appspot.com",
  messagingSenderId: "794583488224",
  appId: "1:794583488224:web:f3a6076c904aa1c6352285",
  measurementId: "G-M2CMHVRCN9",
};

describe("Firebase Config", () => {
  test("has a valid API key", () => {
    expect(firebaseConfig.apiKey).toBeDefined();
    expect(firebaseConfig.apiKey).not.toBe("");
  });

  test("has a valid auth domain", () => {
    expect(firebaseConfig.authDomain).toBeDefined();
    expect(firebaseConfig.authDomain).not.toBe("");
  });

  test("has a valid project ID", () => {
    expect(firebaseConfig.projectId).toBeDefined();
    expect(firebaseConfig.projectId).not.toBe("");
  });

  test("has a valid storage bucket", () => {
    expect(firebaseConfig.storageBucket).toBeDefined();
    expect(firebaseConfig.storageBucket).not.toBe("");
  });

  test("has a valid messaging sender ID", () => {
    expect(firebaseConfig.messagingSenderId).toBeDefined();
    expect(firebaseConfig.messagingSenderId).not.toBe("");
  });

  test("has a valid app ID", () => {
    expect(firebaseConfig.appId).toBeDefined();
    expect(firebaseConfig.appId).not.toBe("");
  });

  test("has a valid measurement ID", () => {
    expect(firebaseConfig.measurementId).toBeDefined();
    expect(firebaseConfig.measurementId).not.toBe("");
  });
});
