require('chai').should()
const { getType } = require('../lib/cli-helper')

describe('command line', () => {
	it('should detect existing .git folder', () => {
		getType()
	})
})
