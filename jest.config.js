module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  setupTestFrameworkScriptFile: './jest.setup.js',
  testMatch: [
    '**/src/**/?(*.)test.js?(x)',
  ],
  /*
  moduleNameMapper: {
    'styles': '<rootDir>/test/mocks/fnMock.js',
  },
  setupFiles: ['./jest.test-env.js'],
  */
};
