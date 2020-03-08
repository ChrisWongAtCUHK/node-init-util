const fs = require('fs')
const { execSync } = require('child_process')
const jsonfile = require('jsonfile')
const { createFile, log } = require('./util')

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

/*
 * Create .eslintrc.js from template if necessar
 */
const eslintInit = () => {
	createFile('.eslintrc.js')
}

/*
 * Alter package.json to implement husky and lint-staged
 */
const lintPreCommit = () => {
	let packageJson = jsonfile.readFileSync('./package.json')
	if(!packageJson['husky']) {
		packageJson['husky'] = { hooks: { 'pre-commit': 'lint-staged' }}
		log('husky is configured.')
	} else {
		log('husky exists already.')
	}

	if(!packageJson['lint-staged']) {
		packageJson['lint-staged'] = { '*.js': ['eslint --fix', 'git add']}
		log('lint-staged is configured.')
	} else {
		log('lint-staged exists already.')
	}

	jsonfile.writeFileSync('./package.json', packageJson, { spaces: 2 })
}

module.exports = { eslintInit, lintPreCommit, yarnAdd, yarnInit }
