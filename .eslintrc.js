module.exports = {
  env: {
    browser: true
  },
  extends: 'google',
  parserOptions: {
    'ecmaVersion': 5
  },
  root: true,
  rules: {
    // General JavaScript Rules
    'max-len': [
      'error', 120
    ]
  }
};
