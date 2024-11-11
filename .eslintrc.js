module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    "plugin:vue/vue3-recommended"
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error'
  }
}