require('chai').should()
const { gitIgnore, gitInit } = require('../lib/git-helper')

describe('git', () => {
	it('should detect existing .git folder', () => {
		gitInit()
	})

	it('should detect existing .gitignore files', () => {
		gitIgnore()
	})
})
