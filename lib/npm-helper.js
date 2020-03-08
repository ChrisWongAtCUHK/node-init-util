const fs = require('fs')
const { execSync } = require('child_process')
const jsonfile = require('jsonfile')
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

/*
 * Alter command accordingly
 * @param {array} cmds The commands
 * @param {object} packageJson The json obj of package.json
 * @param {string} packageName The npm package name, eslint/husky/lint-staged
 * @return {array} The commands(if altered)
 */
const alterCmd = (cmds, packageJson, packageName) => {
	const dependencies = packageJson['dependencies']
	const devDependencies = packageJson['devDependencies']

	// alter command if found
	if((dependencies && dependencies[packageName]) ||
		(devDependencies && devDependencies[packageName])) {
		log(`${packageName} installed already.`)

		return cmds.filter(cmd => cmd !== packageName)
	}

	return cmds
}

/*
 * yarn add eslint husky lint-staged -D, accordingly
 */
const yarnAdd = () => {
	let cmds = ['eslint', 'husky', 'lint-staged']
	const packageJson = jsonfile.readFileSync('./package.json')

	cmds = alterCmd(cmds, packageJson, 'eslint')
	cmds = alterCmd(cmds, packageJson, 'husky')
	cmds = alterCmd(cmds, packageJson, 'lint-staged')

	if(cmds.length > 0) {
		execSync(`yarn add ${cmds.join(' ')} -D`)
	}
}

module.exports = { yarnAdd, yarnInit }
