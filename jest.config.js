module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@babel/runtime)",
  ],
  moduleNameMapper: {
    "^@data/(.*)$": "<rootDir>/src/data/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
    "^@specs/(.*)$": "<rootDir>/src/specs/$1",
    "^@native/(.*)$": "<rootDir>/src/native/$1",
    "^@components/(.*)$": "<rootDir>/src/presentation/components/$1",
    "^@screens/(.*)$": "<rootDir>/src/presentation/product/screens/$1",
  },
};