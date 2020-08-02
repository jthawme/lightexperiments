module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "require-jsdoc": "off",
  },
};
