require('chai').should()
const { gitInit } = require('../lib/git-helper')

describe('git init', () => {
	it('should detect existing .git folder', () => {
		gitInit()
	})
})
