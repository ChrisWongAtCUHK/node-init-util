const { execSync, spawn } = require('child_process')
const { Buffer } = require('buffer')
const { expect } = require('chai')
const tmp = require('tmp')
const { error } = require('../lib/util')

describe('command line', () => {
	const messages = ['package.json exists.']
	let containMessage = new Array(messages.length).fill(false)

	it(messages[0], () => {
		const tmpDir = tmp.dirSync()
		const options = {
			cwd: tmpDir.name
		}
		const node_init_util = spawn('node-init-util', [], options)
		execSync('echo "{}" >> package.json', options)
		node_init_util.stdout.on('data', (data) => {
			const result = Buffer.from(data).toString('ascii')
			if(result.includes(messages[0])) {
				containMessage[0] = true
			}
		})

		node_init_util.stderr.on('data', (data) => {
			error('stderr:')
			error(Buffer.from(data).toString('ascii'))
		})

		node_init_util.on('close', () => {
			expect(containMessage[0]).to.be.true
		})
	})
})
