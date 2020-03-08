module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
		},
    "rules": {
      "comma-dangle": "error",
      "comma-spacing": "error",
			"eol-last": "error",
			"func-call-spacing": "error",
			"func-name-matching": "error",
			"func-names": "error",
			"func-style": "error",
			"indent": "off",
			"linebreak-style": [
					"error",
					"unix"
			],
			"newline-before-return": "error",
			"no-alert": "error",
			"no-alert": "error",
			"no-empty-function": "error",
			"no-lonely-if": "error",
			"no-magic-numbers": "off",
			"no-multiple-empty-lines": "error",
			"no-tabs": "off",
			"no-trailing-spaces": "error",
			"no-undef-init": "error",
			"no-undefined": "error",
			"no-var": "error",
			"quotes": [
					"error",
					"single"
			],
      "require-jsdoc": "error",
			"semi": ["error", "never"],
      "sort-keys": "error",
      "strict": "error",
      "valid-jsdoc": "error"
		}
};
