import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ReportStack } from "./ReportStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "test-uri" }] })
  ),
}));
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

jest.mock("victory-native", () => ({
  VictoryPie: jest.fn(() => null), // Mocked component returns null
  VictoryLabel: jest.fn(() => null), // Mocked component returns null
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "test-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: "test-uid",
      photoURL: "test-photoURL",
      displayName: "test-displayName",
      email: "test-email",
    },
  })),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));
const initialState = {
  profile: {
    profile: "profile",
    user_photo: "test-photo",
    email: "initial-email",
    uid: "test-uid",
  },
};
jest.mock("../screens", () => ({
  ConnectedHomeScreen: jest.fn(() => null),
  ConnectedCommentScreen: jest.fn(() => null),
}));
jest.mock("../screens", () => ({
  ConnectedPostScreen: jest.fn(() => null),
  ConnectedCameraScreen: jest.fn(() => null),
  ConnectedInformationScreen: jest.fn(() => null),
}));

jest.mock("../screens/Post/AITScreen", () => ({
  AITScreen: jest.fn(() => null),
}));

jest.mock("../screens", () => ({
  ConnectedProfileScreen: jest.fn(() => null),
}));

jest.mock("../screens/Profile/ApprovalScreen/ApprovalScreen", () => ({
  ApprovalScreen: jest.fn(() => null),
}));
jest.mock("../screens", () => ({
  ReportScreen: jest.fn(() => null),
}));

jest.mock("../screens/Report/HistoryScreen/HistoryScreen", () => ({
  HistoryScreen: jest.fn(() => null),
}));
const mockReducer = (state = { initialState }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const mockStore = createStore(
  mockReducer,
  {
    profile: {
      profile: "profile",
      user_photo: "test-photo",
      email: "initial-email",
      uid: "test-uid",
    },
  },
  applyMiddleware(thunk)
);

describe("HomeStack", () => {
  it("navigates to home screen when home button is pressed", () => {
    const Tab = createNativeStackNavigator();

    const navigate = jest.fn();
    useNavigation.mockReturnValue({ navigate });
    // Dispatch the SET_EMAIL action to set the email state to "test-email"
    mockStore.dispatch({ type: "SET_EMAIL", email: "test-email" });

    const { getByTestId } = render(
      <NavigationContainer>
        <Provider store={mockStore}>
          <Tab.Navigator>
            <Tab.Screen name="Publicar" component={ReportStack} />
          </Tab.Navigator>
        </Provider>
      </NavigationContainer>
    );
    screen.debug();

    // fireEvent.press(getByTestId("home-button"));
    // expect(navigate).toHaveBeenCalledWith("Home");
  });
});
