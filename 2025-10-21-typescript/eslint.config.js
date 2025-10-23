const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = tseslint.config(
  {
    // グローバルに無視するファイルやディレクトリを指定
    ignores: ['dist/', 'node_modules/', 'eslint.config.js'],
  },
  // デフォルトの推奨設定を適用
  ...tseslint.configs.recommended,
  {
    // jestのテストファイル用の設定
    files: ['**/*.test.ts'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    // その他のソースコード用の設定
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  // Prettierの推奨設定を最後に適用（ルールの上書きのため）
  eslintPluginPrettierRecommended,
);
