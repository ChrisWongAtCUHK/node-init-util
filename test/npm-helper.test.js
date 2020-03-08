require('chai').should()
const { eslintInit, yarnAdd, yarnInit } = require('../lib/npm-helper')

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
})
