require('chai').should()
const { eslintInit, lintPreCommit, utilInit, yarnAdd, yarnInit } = require('../lib/npm-helper')

describe('yarn', () => {
	it('should detect existing package.json', () => {
		yarnInit()
	})

	it('should install eslint husky lint-staged accordingly', () => {
		yarnAdd()
	})

	it('should create .eslintrc.js', () => {
		eslintInit()
	})

	it('should alter package.json if necessary', () => {
		lintPreCommit()
	})

	it('should create lib/util.js if necessary', () => {
		utilInit()
	})
})
