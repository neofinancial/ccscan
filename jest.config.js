module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/build/',
    '!<rootDir>/dist/',
    '!<rootDir>/*.js'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/', '<rootDir>/config.*.js']
};
