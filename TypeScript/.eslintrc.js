module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["standard-with-typescript", "prettier"],
  "env": {
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "project": ["./tsconfig.json"]
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "semi": true,
        "singleQuote": true,
        "trailingComma": "all"
      }
    ],
  },
};