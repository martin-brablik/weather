module.exports = {
  "root": true,
  "parser": '@typescript-eslint/parser',
  "parserOptions": {
    "project": 'tsconfig.json',
    "tsconfigRootDir": __dirname,
    "sourceType": 'module',
  },
  "ignorePatterns": ["projects/**/*", "dist/**/*", ".eslintrc.js", "webpack.config.js"],
  "plugins": ["@stylistic"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@stylistic/disable-legacy'
      ],
      "rules": {
        "@stylistic/semi": "error",
        "@stylistic/indent": ["warn", 2],
        "@stylistic/block-spacing": ["warn", "always"],
        "@stylistic/quotes": ["error", "single"],
        "@stylistic/arrow-parens": ["error", "always"],
        "@stylistic/arrow-parens": ["warn", "always"],
        "@stylistic/brace-style": ["error", "stroustrup"],
        "@stylistic/comma-dangle": ["error", "never"],
        "@stylistic/lines-between-class-members": ["warn", "always"],
        "@stylistic/new-parens": ["error", "always"],
        "@stylistic/no-extra-semi": "error",
        "@stylistic/no-floating-decimal": "error",
        "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: true }],
        "@stylistic/no-trailing-spaces": ["warn", { skipBlankLines: false, ignoreComments: false }],
        "@stylistic/object-curly-spacing": ["warn", "always", { arraysInObjects: false, objectsInObjects: true }],
        "@stylistic/padded-blocks": ["warn", { blocks: "never", classes: "always", switches: "never" }],
        "@stylistic/quote-props": ["warn", "consistent-as-needed"],
        "@stylistic/one-var-declaration-per-line": ["error", "always"],
        "@stylistic/template-curly-spacing": ["error", "never"],
        "@stylistic/type-generic-spacing": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/prefer-return-this-type": "warn",
        "no-duplicate-imports": ["error", { "includeExports": true }],
        "camelcase": "warn",
        "no-var": "warn",
        "prefer-const": "warn",
      }
    }
  ]
}
