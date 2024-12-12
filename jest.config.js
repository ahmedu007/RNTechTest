module.exports = {
  preset: 'react-native',
  collectCoverageFrom: [
    '<rootDir>/src/Components/**/*.{jsx, tsx}',
    '<rootDir>/src/App.{jsx, tsx}',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|ky|react-redux)',
  ],
};
