/* eslint-disable no-console */
const error = console.error
const log = console.log

/* eslint-disable no-console */

const fs = require('fs')

/*
 * Create file from template if necessary
 * @param {string} filename File name
 */
const createFile = (filename) => {
	if(fs.existsSync(filename)) {
		log(`${filename} exists.`)
	} else {
		const ignore = fs.readFileSync(`${__dirname}/../${filename}`)
		fs.writeFileSync(filename, ignore)
		log(`${filename} is created.`)
	}
}

module.exports = { createFile, error, log  }
