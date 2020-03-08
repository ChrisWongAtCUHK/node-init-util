require('chai').should()
const { yarnInit } = require('../lib/npm-helper')

describe('yarn init -y', () => {
	it('should detect existing package.json', () => {
		yarnInit()
	})
})
