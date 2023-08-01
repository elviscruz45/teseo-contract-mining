import React from "react";
import { Provider } from "react-redux";
import { render } from "react-native-testing-library";
import configureStore from "redux-mock-store";
import App from "./App";

jest.mock("./__mocks__/NativeAnimatedHelper", () => {
  return {
    __esModule: true,
    default: {},
  };
});

describe("App", () => {
  const mockStore = configureStore([]);
  const initialState = {}; // Add any initial state required for your tests
  const store = mockStore(initialState);

  it("renders the ConnectedLoginNavigator component", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const connectedLoginNavigator = getByTestId("connected-login-navigator");
    expect(connectedLoginNavigator).toBeDefined();
  });
});

[
  {
    ApprovalPerformed: [],
    ApprovalRequestSentTo: ["alonso@fmi.com"],
    ApprovalRequestedBy: "alonso@fmi.com",
    IdAITService: "P7z1KOSlWLyjQWdRrTMu",
    date: [Object],
    idApproval: "wXhzfTashAgZoMf1KrWU",
    solicitud: "Contratista-Envio EDP",
  },
  {
    ApprovalPerformed: [],
    ApprovalRequestSentTo: [
      "generic@gmail.com",
      "elviscruz45@gmail.com",
      "alonso@fmi.com",
    ],
    ApprovalRequestedBy: "alonso@fmi.com",
    IdAITService: "P7z1KOSlWLyjQWdRrTMu",
    date: [Object],
    idApproval: "fp7pJbHnawTxsQuMHeol",
    solicitud: "Contratista-Envio EDP",
  },
  {
    ApprovalPerformed: [],
    ApprovalRequestSentTo: [
      "alonso@fmi.com",
      "daniel@gmail.com",
      "elviscruz45@gmail.com",
    ],
    ApprovalRequestedBy: "",
    IdAITService: "r4tnI2GJj7TMeq5TyR0X",
    date: [Object],
    fileName: "20498681388-09-EG07-2400_AAQ_OTP_161.pdf",
    idApproval: "4uSjn3NJOG7O2KWlSNKc",
    pdfFile:
      "https://firebasestorage.googleapis.com/v0/b/teseo-app-81d77.appspot.com/o/pdfPost%2F51487892-356d-4731-89ba-34c037dcee5e?alt=media&token=12f1d871-0006-4576-b459-1b252ca62536",
    solicitud: "Usuario-Aprobacion Doc",
  },
];
