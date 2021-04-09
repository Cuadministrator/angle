module.exports = {
  "extends": [
    "airbnb",
    // "plugin:prettier/recommended"
  ],
  "globals": {},
  "rules": {
    "import/no-unresolved": ["error", {
      commonjs: true,
      amd: true 
  }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "mjs": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": ["error", {"extensions": [".js", ".jsx", ".tsx"]}],
    "react/destructuring-assignment": [
      "off",
      "always",
      { "ignoreClassFields": true }
    ],
    "react/prop-types": ["error", {
      ignore: ["children"],
      skipUndeclared: true
    }],
    "react/no-unused-prop-types": ["warn"],
    "react/jsx-max-props-per-line": [
      "error", {
        "maximum": 1,
        "when": "multiline"
      }
    ],
    "react/require-default-props": "off",
    "react/jsx-fragments": ["off", "element"],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-one-expression-per-line": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/no-array-index-key": "warn",
    "jsx-a11y/accessible-emoji": "off",

    "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "never" }],
    "@typescript-eslint/no-extra-semi": "warn",
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "none",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "semi",
        "requireLast": false
      }
    }],

    "no-underscore-dangle": ["error", {}],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "camelcase": "error",
    "object-property-newline": ["error", {"allowAllPropertiesOnSameLine": false}],
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 3
      },
      "ObjectPattern": {
        "multiline": true,
        "minProperties": 3
      },
      "ImportDeclaration": {"consistent": true},
      "ExportDeclaration": {"consistent": true}
    }],
    "array-element-newline": [
      "error",
      "consistent"
    ],
    "array-bracket-newline": ["error", "consistent"],
    "jsx-quotes": ["error", "prefer-single"],
    "semi": ["error", "never"],
    "no-undef": "error",
    "prefer-const": "error",
    "class-methods-use-this": "off",
    "no-nested-ternary": "off",
    "@typescript-eslint/no-unused-vars": [
      process.env.NODE_ENV === "production" ? "error" : "off", {
        "varsIgnorePattern": "[iI]gnored|^_",
        "ignoreRestSiblings": true,
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "no-unused-vars": [process.env.NODE_ENV === 'production' ? "error" : "off", {
      "varsIgnorePattern": "[iI]gnored|^_",
      "ignoreRestSiblings": true,
      "args": "after-used",
      "argsIgnorePattern": "^_"
    }],
    "no-console": process.env.NODE_ENV === 'production' ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === 'production' ? "error" : "warn",
    "no-param-reassign": ["error", { "props": false }],
    "max-len": ["error", {
      "code": 80,
      "comments": 100,
      "ignorePattern": "eslint|`",
      "ignoreComments": true,
      "ignoreUrls": true,
      "ignoreTrailingComments": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }],
    "no-shadow": "warn",
    "no-continue": "off",
    "no-lonely-if": "off"
  },
  "settings": {
    "import/extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ],
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ],
      },
      "alias": {
        "map": [
          ["@src", "./src/"]
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx"
      ]
    },
    "import/core-modules": [],
    "import/ignore": [
      "node_modules",
      "\\.(coffee|scss|css|less|hbs|svg|json)$"
    ]
  }
}
