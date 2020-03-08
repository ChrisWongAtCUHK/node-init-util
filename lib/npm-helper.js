const fs = require('fs')
const { execSync } = require('child_process')
const { log } = require('./util')

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

module.exports = { yarnInit }
