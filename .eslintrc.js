module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [
    'WireElement.vue',
    'WireSection.vue',
    'WirePromoCode.vue',
    'scripts/**/*.js',
    'vue.config.js',
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    'ecmaVersion': 2020
  },
  'rules': {
    'vue/no-v-html': 0,
    'no-console': 0,
  }
}
