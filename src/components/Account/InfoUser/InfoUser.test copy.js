import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { InfoUser } from "./InfoUser";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "image_uri" }] })
  ),
}));

jest.mock("@firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "image_path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("image_url")),
}));

jest.mock("@firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "user_id" },
  })),
  updateProfile: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

jest.mock("../../../../assets/manpower2.png", () => "manpower_image");
jest.mock("../../../../assets/bell1.png", () => "bell_image");

describe("InfoUser", () => {
  it("renders the component correctly", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId, getByText } = render(<InfoUser {...props} />);

    expect(getByTestId("avatar")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("test@example.com")).toBeTruthy();
    expect(getByText("Manager")).toBeTruthy();
    expect(getByText("Lorem ipsum")).toBeTruthy();
    expect(getByTestId("manpower-button")).toBeTruthy();
    expect(getByTestId("approval-button")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
  });

  it("calls changeAvatar function when avatar accessory is pressed", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId } = render(<InfoUser {...props} />);
    const avatarAccessory = getByTestId("avatar-accessory");

    fireEvent.press(avatarAccessory);

    expect(avatarAccessory).toBeTruthy();
    expect(launchImageLibraryAsync).toHaveBeenCalled();
    expect(uploadImage).toHaveBeenCalledWith("image_uri");
    expect(updatePhotoUrl).toHaveBeenCalledWith("image_path");
    expect(props.update_firebasePhoto).toHaveBeenCalledWith("image_url");
  });

  it("calls goToApprovalScreen function when approval button is pressed", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId } = render(<InfoUser {...props} />);
    const approvalButton = getByTestId("approval-button");

    fireEvent.press(approvalButton);

    expect(approvalButton).toBeTruthy();
    expect(navigate).toHaveBeenCalledWith(screen.profile.tab, {
      screen: screen.profile.approvals,
    });
  });

  it("calls updateManpower function when manpower button is pressed", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId } = render(<InfoUser {...props} />);
    const manpowerButton = getByTestId("manpower-button");

    fireEvent.press(manpowerButton);

    expect(manpowerButton).toBeTruthy();
    expect(setRenderComponent).toHaveBeenCalledWith(
      <ChangeManPower onClose={onCloseOpenModal} />
    );
    expect(setShowModal).toHaveBeenCalledWith(true);
  });
});
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { InfoUser } from "./InfoUser";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "image_uri" }] })
  ),
}));

jest.mock("@firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "image_path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("image_url")),
}));

jest.mock("@firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "user_id" },
  })),
  updateProfile: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

jest.mock("../../../../assets/manpower2.png", () => "manpower_image");
jest.mock("../../../../assets/bell1.png", () => "bell_image");

describe("InfoUser", () => {
  it("renders the component correctly", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId, getByText } = render(<InfoUser {...props} />);

    expect(getByTestId("avatar")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("test@example.com")).toBeTruthy();
    expect(getByText("Manager")).toBeTruthy();
    expect(getByText("Lorem ipsum")).toBeTruthy();
    expect(getByTestId("manpower-button")).toBeTruthy();
    expect(getByTestId("approval-button")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
  });

  it("calls changeAvatar function when avatar accessory is pressed", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId } = render(<InfoUser {...props} />);
    const avatarAccessory = getByTestId("avatar-accessory");

    fireEvent.press(avatarAccessory);

    expect(avatarAccessory).toBeTruthy();
    expect(launchImageLibraryAsync).toHaveBeenCalled();
    expect(uploadImage).toHaveBeenCalledWith("image_uri");
    expect(updatePhotoUrl).toHaveBeenCalledWith("image_path");
    expect(props.update_firebasePhoto).toHaveBeenCalledWith("image_url");
  });

  it("calls goToApprovalScreen function when approval button is pressed", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId } = render(<InfoUser {...props} />);
    const approvalButton = getByTestId("approval-button");

    fireEvent.press(approvalButton);

    expect(approvalButton).toBeTruthy();
    expect(navigate).toHaveBeenCalledWith(screen.profile.tab, {
      screen: screen.profile.approvals,
    });
  });

  it("calls updateManpower function when manpower button is pressed", () => {
    const props = {
      uid: "user_id",
      email: "test@example.com",
      user_photo: "user_photo_url",
      profile: {
        displayNameform: "John Doe",
        cargo: "Manager",
        descripcion: "Lorem ipsum",
        userType: "manager",
      },
      approvalListNew: [{ id: 1 }, { id: 2 }],
      update_firebasePhoto: jest.fn(),
    };

    const { getByTestId } = render(<InfoUser {...props} />);
    const manpowerButton = getByTestId("manpower-button");

    fireEvent.press(manpowerButton);

    expect(manpowerButton).toBeTruthy();
    expect(setRenderComponent).toHaveBeenCalledWith(
      <ChangeManPower onClose={onCloseOpenModal} />
    );
    expect(setShowModal).toHaveBeenCalledWith(true);
  });
});
