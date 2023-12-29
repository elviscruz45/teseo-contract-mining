// App.test.js
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { AppNavigation } from "./AppNavigation";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

jest.mock("victory-native", () => ({
  VictoryPie: jest.fn(() => null),
  VictoryLabel: jest.fn(() => null),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "test-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
}));

jest.mock("./HomeStack", () => ({
  ConnectedHomeStack: () => <div data-testid="home-stack">HomeStack</div>,
}));

jest.mock("./ReportStack", () => ({
  ReportStack: () => <div data-testid="report-stack">ReportStack</div>,
}));

jest.mock("./PostStack", () => ({
  PostStack: () => <div data-testid="post-stack">PostStack</div>,
}));

jest.mock("./SearchStack", () => ({
  SearchStack: () => <div data-testid="search-stack">SearchStack</div>,
}));

jest.mock("./ProfileStack", () => ({
  ProfileStack: () => <div data-testid="profile-stack">ProfileStack</div>,
}));

describe("AppNavigation", () => {
  test("should render the Home screen by default", () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    screen.debug();

    const homeScreenText = getByText("Inicio");
    expect(homeScreenText).toBeTruthy();
  });
});

// jest.mock("@react-native-async-storage/async-storage", () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
// }));
// test("should navigate to Settings screen when tab is pressed", () => {
//   const { getByTestId } = render(<App />);
//   const settingsTab = getByTestId("settings-tab"); // Assuming a testID on the tab

//   fireEvent.press(settingsTab);

//   const settingsScreenText = getByText("Settings Screen");
//   expect(settingsScreenText).toBeTruthy();
// });

// import React from "react";
// import { render, screen } from "@testing-library/react-native";
// import { AppNavigation } from "./AppNavigation";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// jest.mock("@react-navigation/bottom-tabs", () => ({
//   createBottomTabNavigator: jest.fn(),
// }));
// jest.mock("@react-navigation/native-stack", () => ({
//   createNativeStackNavigator: jest.fn(),
// }));
// jest.mock("@react-navigation/native", () => ({
//   useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
// }));

// describe("AppNavigation", () => {
//   it("renders correctly", () => {
//     const { getByText } = render(<AppNavigation />);
//     screen.debug();

//     expect(getByText("Inicio")).toBeTruthy();
//     expect(getByText("Reportes")).toBeTruthy();
//     expect(getByText("Publicar")).toBeTruthy();
//     expect(getByText("Buscar")).toBeTruthy();
//     expect(getByText("Perfil")).toBeTruthy();
//   });

//   // it("uses createBottomTabNavigator", () => {
//   //   render(<AppNavigation />);
//   //   expect(createBottomTabNavigator).toHaveBeenCalled();
//   // });
// });

// // import React from "react";
// // import { render, screen } from "@testing-library/react-native";
// // import { AppNavigation } from "./AppNavigation";
// // jest.mock("firebase/app", () => ({
// //   initializeApp: jest.fn(),
// // }));
// // jest.mock("firebase/auth", () => ({
// //   getAuth: jest.fn(),
// //   updateProfile: jest.fn(),
// // }));
// // jest.mock("@react-native-async-storage/async-storage", () => ({
// //   getItem: jest.fn(),
// //   setItem: jest.fn(),
// //   removeItem: jest.fn(),
// // }));
// // jest.mock("firebase/analytics", () => ({
// //   getAnalytics: jest.fn(),
// // }));
// // jest.mock("firebase/firestore", () => ({
// //   getFirestore: jest.fn(),
// // }));
// // jest.mock("@react-navigation/bottom-tabs", () => ({
// //   createBottomTabNavigator: jest.fn(),
// // }));
// // jest.mock("@react-navigation/native-stack", () => ({
// //   createNativeStackNavigator: jest.fn(),
// // }));
// // jest.mock("victory-native", () => ({
// //   VictoryPie: jest.fn(() => null), // Mocked component returns null
// //   VictoryLabel: jest.fn(() => null), // Mocked component returns null
// // }));
// // jest.mock("firebase/storage", () => ({
// //   getStorage: jest.fn(),
// //   ref: jest.fn(),
// //   uploadBytes: jest.fn(() =>
// //     Promise.resolve({ metadata: { fullPath: "test-path" } })
// //   ),
// //   getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
// // }));
// // jest.mock("@react-navigation/native", () => ({
// //   useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
// // }));
// // jest.mock("@react-navigation/bottom-tabs", () => ({
// //   createBottomTabNavigator: jest.fn(() => ({
// //     Navigator: () => null,
// //     Screen: () => null,
// //   })),
// // }));
// // describe("AppNavigation", () => {
// //   it("renders correctly", () => {
// //     const { getByText } = render(<AppNavigation />);
// //     console.log("como estas que tal te va");
// //     screen.debug();

// //     // expect(getByText("Inicio")).toBeTruthy();
// //     // expect(getByText("Reportes")).toBeTruthy();
// //     // expect(getByText("Publicar")).toBeTruthy();
// //     // expect(getByText("Buscar")).toBeTruthy();
// //     // expect(getByText("Perfil")).toBeTruthy();
// //   });
