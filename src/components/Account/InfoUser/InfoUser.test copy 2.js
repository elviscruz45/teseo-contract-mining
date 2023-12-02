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
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "test-uid" },
  })),
  updateProfile: jest.fn(),
}));
jest.mock("@rneui/themed", () => ({
  // Avatar: jest.fn(({ source, accessory, onAccessoryPress }) => (
  //   <div
  //     data-testid="avatar"
  //     source={source}
  //     accessory={accessory}
  //     onAccessoryPress={onAccessoryPress}
  //   />
  // )),
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
    Promise.resolve({ canceled: false, assets: [{ uri: "test-uri" }] })
  ),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(() => ({
    ref: jest.fn(() => ({
      fullPath: "test-full-path",
    })),
  })),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "test-full-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("test-image-url")),
  ref: jest.fn(() => ({
    fullPath: "test-full-path",
  })),
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
jest.mock("../../Profile/ManPowerForm/ChangeManPower", () => ({
  ChangeManPower: jest.fn(({ onClose }) => (
    <button onClick={onClose}>Close</button>
  )),
}));
// jest.mock("react-redux", () => ({
//   connect: jest.fn(() => (component) => component),
// }));

const mockStore = configureStore([]);

describe("InfoUser", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      profile: {
        profile: {
          displayNameform: "John Doe",
          cargo: "Manager",
          descripcion: "Lorem ipsum",
          userType: "manager",
        },
        user_photo: "test-photo-url",
        email: "test@example.com",
        uid: "test-uid",
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
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ConnectedInfoUser />
      </Provider>
    );

    // expect(getByText("John Doe")).toBeTruthy();
    // expect(getByText("test@example.com")).toBeTruthy();
    // expect(getByText("Manager")).toBeTruthy();
    // expect(getByText("Lorem ipsum")).toBeTruthy();
    // expect(getByTestId("avatar")).toHaveProp("source", {
    //   uri: "test-photo-url",
    // });
  });

  // it("calls changeAvatar function when avatar accessory is pressed", () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <ConnectedInfoUser />
  //     </Provider>
  //   );

  //   fireEvent.press(getByTestId("avatar-accessory"));
  //   expect(getByTestId("avatar-accessory")).toHaveBeenCalled();
  // });

  // it("calls updateManpower function when update manpower button is pressed", () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <ConnectedInfoUser />
  //     </Provider>
  //   );

  //   fireEvent.press(getByText("Update Manpower"));
  //   expect(getByText("Close")).toHaveBeenCalled();
  // });

  // it("calls goToApprovalScreen function when bell button is pressed", () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <ConnectedInfoUser />
  //     </Provider>
  //   );

  //   fireEvent.press(getByTestId("bell-button"));
  //   expect(getByTestId("bell-button")).toHaveBeenCalled();
  // });
});
