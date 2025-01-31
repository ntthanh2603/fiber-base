module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "on", // Tắt hoàn toàn lỗi và cảnh báo "Unexpected any"
  },
};
