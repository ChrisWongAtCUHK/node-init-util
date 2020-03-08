/* eslint-disable no-console */
const log = console.log

/* eslint-disable no-console */
const fs = require('fs')
const { execSync } = require('child_process')

/*
 * if package.json not exist, yarn init -y
 */
const yarnInit = () => {
	if(!fs.existsSync('./packages.json')) {
		execSync('yarn', ['init', '-y'])
		log('package.json is created.')
	} else {
		log('package.json exists.')
	}
}

module.exports = { yarnInit  }
