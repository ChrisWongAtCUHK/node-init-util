# node-init-util

## Installation
```
npm install node-init-util -g
```

## Usage
```
node-init [options]
```

## What this utility do
1. if package.json not exist, `yarn init -y`
2. if .git not exist, `git init`
3. if .gitignore not exit, create
4. yarn add eslint husky lint-staged -D
5. if .eslintrc.js, create
6. if package.json does not include husky or lint-staged configuration, add
	```
	  "husky": {
		"hooks": {
		  "pre-commit": "lint-staged"
		}
	  },
	  "lint-staged": {
		"*.js": [
		  "eslint --fix",
		  "git add"
		]
	  }

	```
7. create lib/util.js if necessary
