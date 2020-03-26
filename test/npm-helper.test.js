require('chai').should()
const { expect } = require('chai')

const { eslintInit, lintPreCommit, utilInit, yarnAdd, yarnAddDev, yarnInit, readPackageJsonSync } = require('../lib/npm-helper')

describe('yarn', () => {
	it('should detect existing package.json', () => {
		yarnInit()
	})

	it('should install eslint husky lint-staged vuepress accordingly', () => {
		const packageJson = yarnAddDev(readPackageJsonSync())
		expect(packageJson).to.be.an('object')
	})

	it('should verify the package.json', () => {
		const packageJson = readPackageJsonSync()
		expect(packageJson.main).to.equal('index.js')
	})

	it('should install puppeteer', () => {
		const packageJson = yarnAddDev(readPackageJsonSync())
		yarnAdd(packageJson, ['puppeteer'])
	})

	it('should create .eslintrc.js', () => {
		eslintInit()
	})

	it('should alter `package.json` husky if necessary', () => {
		const packageJson = lintPreCommit(readPackageJsonSync())
		expect(packageJson.husky).to.be.an('object')
	})

	it('should create lib/util.js if necessary', () => {
		utilInit()
	})
})
