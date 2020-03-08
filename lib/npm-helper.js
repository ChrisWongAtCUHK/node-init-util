/* eslint-disable no-console */
const log   = console.log
const error = console.error

/* eslint-disable no-console */
const fs = require('fs')
const { execSync } = require('child_process')

/*
 * if package.json not exist, yarn init -y
 */
const yarnInit = () => {
	if(fs.existsSync('./package.json')) {
		log('package.json exists.')
	} else {
		execSync('yarn init -y')
		log('package.json is created.')
	}
}

module.exports = { error, log, yarnInit }
