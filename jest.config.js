module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,js}', '!<rootDir>/node_modules/', '!<rootDir>/build/', '!<rootDir>/*.js'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/config.*.js']
};
