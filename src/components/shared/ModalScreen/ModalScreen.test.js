import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ModalScreen } from "./ModalScreen";

describe("ModalScreen", () => {
  it("renders the modal when show prop is true", () => {
    const { getByTestId } = render(<ModalScreen show={true} />);

    const modal = getByTestId("ModalScreen:Modal");
    expect(modal).toBeTruthy();
  });

  // it("does not render the modal when show prop is false", () => {
  //   const { queryByTestId } = render(
  //     <ModalScreen show={false} close={jest.fn()} />
  //   );

  //   const modal = queryByTestId("ModalScreen:Modal");
  //   expect(modal).toBeNull();
  // });

  // it("calls the close function when the modal is closed", () => {
  //   const closeMock = jest.fn();
  //   const { getByTestId } = render(
  //     <ModalScreen show={true} close={closeMock} />
  //   );

  //   const modal = getByTestId("ModalScreen:Modal");
  //   fireEvent(modal, "close");
  //   expect(closeMock).toHaveBeenCalled();
  // });

  // it("calls the setLocation function when the TouchableOpacity is pressed", () => {
  //   const setLocationMock = jest.fn();
  //   const { getByTestId } = render(
  //     <ModalScreen
  //       show={true}
  //       close={jest.fn()}
  //       setLocation={setLocationMock}
  //     />
  //   );

  //   const touchableOpacity = getByTestId("ModalScreen:TouchableOpacity");
  //   fireEvent.press(touchableOpacity);
  //   expect(setLocationMock).toHaveBeenCalledWith("Aguas Residuales");
  // });
});
