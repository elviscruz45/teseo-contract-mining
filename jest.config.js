module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native(-.*)?|expo-image-picker|firebase/auth|@react-native(-community)?|@rneui)/)",
  ],
  transform: {
    "^.+\\.(jsx?|tsx?)$": "babel-jest",
  },
};
