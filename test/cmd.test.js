require('chai').should()
const tmp = require('tmp')
const { log } = require('../lib/util')

describe('command line', () => {
	it('.git folder exists', () => {
		tmp.file(function _tmpFileCreated(err, path, fd) {
			if(err) throw err

			log('File: ', path)
			log('Filedescriptor: ', fd)
		})
	})
})
