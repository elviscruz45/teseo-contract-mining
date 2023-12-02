import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ConnectedInfoUser } from "./InfoUser";

// Mock the necessary dependencies
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("@rneui/themed", () => ({
  Avatar: jest.fn(
    ({ size, rounded, containerStyle, icon, source, children }) => (
      <div
        data-testid="avatar-mock"
        size={size}
        rounded={rounded}
        style={containerStyle}
      >
        <span data-testid="avatar-icon">{icon.name}</span>
        <img data-testid="avatar-source" src={source.uri} alt="avatar" />
        {children}
      </div>
    )
  ),

  Text: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "mocked-uri" }] })
  ),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "mocked-uid" },
  })),
  updateProfile: jest.fn(),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(() => ({
    ref: jest.fn(() => ({
      fullPath: "mocked-full-path",
    })),
  })),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "mocked-full-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("mocked-image-url")),
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));
jest.mock("../../../actions/profile", () => ({
  update_firebasePhoto: jest.fn(),
  update_firebaseEmail: jest.fn(),
  update_firebaseProfile: jest.fn(),
  update_firebaseUid: jest.fn(),
}));

// Create a mock store
const mockStore = configureStore([]);

describe("InfoUser", () => {
  let store;

  beforeEach(() => {
    // Initialize the mock store
    store = mockStore({
      profile: {
        profile: {
          displayNameform: "John Doe",
          cargo: "Manager",
          descripcion: "Lorem ipsum",
          userType: "manager",
        },
        user_photo: "mocked-user-photo",
        email: "john.doe@example.com",
        uid: "mocked-uid",
      },
      search: {
        approvalListNew: [
          {
            ApprovalPerformed: [],
            RejectionPerformed: [],
          },
          {
            ApprovalPerformed: [],
            RejectionPerformed: [],
          },
        ],
      },
    });
  });

  it("renders the component correctly", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ConnectedInfoUser />
      </Provider>
    );

    expect(getByTestId("avatar")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john.doe@example.com")).toBeTruthy();
    expect(getByText("Manager")).toBeTruthy();
    expect(getByText("Lorem ipsum")).toBeTruthy();
  });

  // it("calls the changeAvatar function when the avatar accessory is pressed", () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <ConnectedInfoUser />
  //     </Provider>
  //   );

  //   fireEvent.press(getByTestId("avatar-accessory"));

  //   expect(
  //     require("expo-image-picker").launchImageLibraryAsync
  //   ).toHaveBeenCalled();
  //   expect(require("firebase/storage").uploadBytes).toHaveBeenCalledWith(
  //     expect.anything(),
  //     expect.anything()
  //   );
  //   expect(require("firebase/storage").getDownloadURL).toHaveBeenCalledWith(
  //     expect.anything()
  //   );
  //   expect(require("firebase/auth").updateProfile).toHaveBeenCalledWith(
  //     { uid: "mocked-uid" },
  //     { photoURL: "mocked-image-url" }
  //   );
  //   expect(
  //     require("../../../actions/profile").update_firebasePhoto
  //   ).toHaveBeenCalledWith("mocked-image-url");
  // });

  // it("navigates to the approval screen when the bell icon is pressed", () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <ConnectedInfoUser />
  //     </Provider>
  //   );

  //   fireEvent.press(getByTestId("bell-icon"));

  //   expect(
  //     require("@react-navigation/native").useNavigation().navigate
  //   ).toHaveBeenCalledWith(expect.anything(), {
  //     screen: expect.anything(),
  //   });
  // });

  // it("renders the ChangeManPower component when the updateManpower function is called", () => {
  //   const { getByTestId, getByText } = render(
  //     <Provider store={store}>
  //       <ConnectedInfoUser />
  //     </Provider>
  //   );

  //   fireEvent.press(getByTestId("manpower-button"));

  //   expect(getByText("ChangeManPower Component")).toBeTruthy(); // Replace with the actual content of the ChangeManPower component
  // });
});
