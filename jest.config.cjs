module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest' // Critical for perfect-debounce
  },
  transformIgnorePatterns: [
    'node_modules/(?!(perfect-debounce|@vue|vue-router|@vue/devtools-api|@vue/devtools-kit))'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};