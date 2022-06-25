/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePathIgnorePatterns: ["<rootDir>/src/config/env"],
    collectCoverageFrom: [
        "<rootDir>/src/**/businessLogic/*.js",
        "<rootDir>/src/**/controllers/*.js",
    ],
    testMatch: [
        "<rootDir>/__tests__/**/*.js",
        "<rootDir>/src/modules/**/businessLogic/**/tests/*.js",
        "<rootDir>/src/utils/tests/*.js",
    ],
    collectCoverage: true,
    globals: {
        jest: {
            isolatedModules: true,
        },
    },
};
