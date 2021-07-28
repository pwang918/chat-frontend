module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    noRestrictedImports: [
      "error",
      {
        patterns: ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"],
      },
    ],
  },
};