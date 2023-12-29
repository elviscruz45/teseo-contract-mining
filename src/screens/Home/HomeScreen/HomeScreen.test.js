import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import { ConnectedHomeScreen } from "./HomeScreen";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";

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
  collection: jest.fn(),
  query: jest.fn(),
  limit: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
}));
jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: jest.fn(),
}));
jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: jest.fn(),
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
describe("HomeScreen", () => {
  it("should render loading spinner when isLoading is true", () => {
    // const props = {
    //   email: "test@example.com",
    // };
    // Create a mock reducer that sets the email state when it receives the SET_EMAIL action
    const mockReducer = (state = {}, action) => {
      switch (action.type) {
        case "SET_EMAIL":
          return {
            ...state,
            profile: {
              ...state.profile,
              email: action.email,
            },
          };
        default:
          return state;
      }
    };
    // Create a mock store with the initial state
    const mockStore = createStore(mockReducer, {
      profile: {
        user_photo: "test-photo",
        email: "initial-email",
      },
    });

    // Dispatch the SET_EMAIL action to set the email state to "test-email"
    mockStore.dispatch({ type: "SET_EMAIL", email: "test-email" });

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <ConnectedHomeScreen />
      </Provider>
    );
    screen.debug();
    // expect(getByTestId("loading-spinner")).toBeTruthy();
  });
});

// it("should render welcome message when posts length is 0", () => {
//   const props = {
//     email: "test@example.com",
//   };

//   const { getByText } = render(<HomeScreen {...props} posts={[]} />);

//   expect(getByText("Bienvenido")).toBeTruthy();
// });

// it("should render posts when posts length is greater than 0", async () => {
//   const props = {
//     email: "test@example.com",
//     posts: [
//       {
//         idDocFirestoreDB: "1",
//         AITphotoServiceURL: "https://example.com/image1.jpg",
//         AITNombreServicio: "Service 1",
//         fotoUsuarioPerfil: "https://example.com/profile1.jpg",
//         nombrePerfil: "User 1",
//         AITcompanyName: "Company 1",
//         visibilidad: "Public",
//         fechaPostFormato: "2022-01-01",
//         titulo: "Post 1",
//         comentarios: "This is a comment",
//         likes: ["test@example.com"],
//         comentariosUsuarios: [],
//         pdfPrincipal: "https://example.com/file1.pdf",
//       },
//       // Add more posts here if needed
//     ],
//   };

//   const { getByText, getByTestId } = render(<HomeScreen {...props} />);

//   await waitFor(() => {
//     expect(getByText("Service 1")).toBeTruthy();
//     expect(getByText("User 1")).toBeTruthy();
//     expect(getByText("Company 1")).toBeTruthy();
//     expect(getByText("Public")).toBeTruthy();
//     expect(getByText("2022-01-01")).toBeTruthy();
//     expect(getByText("Post 1")).toBeTruthy();
//     expect(getByText("This is a comment")).toBeTruthy();
//     expect(getByText("1 Revisado")).toBeTruthy();
//     expect(getByText("0 Comentarios")).toBeTruthy();
//     expect(getByText("Pdf File")).toBeTruthy();
//     expect(getByTestId("post-image")).toBeTruthy();
//     expect(getByTestId("profile-image")).toBeTruthy();
//   });
// });

// Add more tests here if needed
