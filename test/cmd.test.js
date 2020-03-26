const fs = require('fs')
const path = require('path')
const { execSync, spawn } = require('child_process')
const { Buffer } = require('buffer')
const { expect } = require('chai')
const tmp = require('tmp')
const { error } = require('@lib/util')

describe('command line', () => {
	// node-init-util shoud print out messages correspondingly
	const messages = {
		'puppeteer': 'yarn add puppeteer',
		yarnInit: 'package.json exists.'
	}
	const containMessage = {}
	const options = {}

	beforeEach(() => {
		const tmpDir = tmp.dirSync()
		options['cwd'] = tmpDir.name
	})

	it('default', () => {
		const cmd = spawn('node-init-util', [], options)

		// eslint-disable-next-line no-empty-function
		cmd.stdout.on('data', () => {
			// at this moment, do nothing
		})

		cmd.stderr.on('data', (data) => {
			error('stderr:')
			error(Buffer.from(data).toString('ascii'))
		})

		cmd.on('close', () => {
			// git init
			const gitExists = fs.existsSync(path.resolve(options.cwd, '.git'))
			// copy .gitignore
			const gitIgnoreExists = fs.existsSync(path.resolve(options.cwd, '.gitignore'))
			// yarn init -y
			const pkgExists = fs.existsSync(path.resolve(options.cwd, 'package.json'))
			// copy .eslintric.js
			const eslintExists = fs.existsSync(path.resolve(options.cwd, '.eslintrc.js'))
			// copy lib/util.js
			const utilExists = fs.existsSync(path.resolve(options.cwd, 'lib', 'util.js'))
			// copy docs
			const docsExists = fs.existsSync(path.resolve(options.cwd, 'docs'))

			expect(gitExists).to.be.true
			expect(gitIgnoreExists).to.be.true
			expect(pkgExists).to.be.true
			expect(eslintExists).to.be.true
			expect(utilExists).to.be.true
			expect(docsExists).to.be.true
		})
	})

	it('puppeteer', () => {
		const testName = 'puppeteer'
		const cmd = spawn('node-init-util', ['--type', 'puppeteer'], options)

		cmd.stdout.on('data', (data) => {
			const result = Buffer.from(data).toString('ascii')
			// once the result have the message(true), would not change to false
			containMessage[testName] = containMessage[testName] || result.includes(messages[testName])
		})

		cmd.stderr.on('data', (data) => {
			error('stderr:')
			error(Buffer.from(data).toString('ascii'))
		})

		cmd.on('close', () => {
			expect(containMessage[testName]).to.be.true
		})
	})

	it('yarn init with type', () => {
		const testName = 'yarnInit'
		const cmd = spawn('node-init-util', [], options)
		execSync('echo "{}" >> package.json', options)
		cmd.stdout.on('data', (data) => {
			const result = Buffer.from(data).toString('ascii')
			// once the result have the message(true), would not change to false
			containMessage[testName] = containMessage[testName] || result.includes(messages[testName])
		})

		cmd.stderr.on('data', (data) => {
			error('stderr:')
			error(Buffer.from(data).toString('ascii'))
		})

		cmd.on('close', () => {
			expect(containMessage[testName]).to.be.true
		})
	})
})
