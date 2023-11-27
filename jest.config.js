module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    // "node_modules/(?!((jest-)?react-native(-.*)?|expo-image-picker|firebase/auth|@react-native(-community)?|@rneui)/)",
  ],
  transform: {
    "^.+\\.(jsx?|tsx?)$": "babel-jest",
  },
};
