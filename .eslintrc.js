module.exports = {
    root: true,
    parser: "babel-eslint",
    env: {
      es6: true,
      browser: true,
      node: true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      "no-unused-vars": 0,
      "react/display-name": 0,
      "react/prop-types": 0
    },
    settings: {
      react: {
        version: "16.4.2"
      }
    }
  }