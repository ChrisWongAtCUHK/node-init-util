const fs = require('fs')
const { exec, execSync } = require('child_process')
const jsonfile = require('jsonfile')
const { createFile } = require('./fs-util')
const { log } = require('./util')

const PACKAGE_JSON = './package.json'

/*
 * if package.json not exist, yarn init -y
 */
const yarnInit = () => {
	if(fs.existsSync('./package.json')) {
		log('package.json exists.')
	} else {
		execSync('yarn init -y 2> /dev/null')
		log('package.json is created.')
	}
}

/*
 * Read package.json
 * @return {object} The json object
 */
const readPackageJsonSync = () => {
	return jsonfile.readFileSync(PACKAGE_JSON)
}

/*
 * Write package.json
 * @param {object} The json object
 */
const writePackageJsonSync = (packageJson) => {
	jsonfile.writeFileSync(PACKAGE_JSON, packageJson, { spaces: 2 })
}

/*
 * Alter packages accordingly
 * @param {array} pkgs The packages
 * @param {object} packageJson The json obj of package.json
 * @param {string} packageName The npm package name, eslint/husky/lint-staged
 * @return {array} The commands(if altered)
 */
const alterPkgs = (pkgs, packageJson, packageName) => {
	const dependencies = packageJson['dependencies']
	const devDependencies = packageJson['devDependencies']

	// alter command if found
	if((dependencies && dependencies[packageName]) ||
		(devDependencies && devDependencies[packageName])) {
		log(`${packageName} installed already.`)

		return pkgs.filter(cmd => cmd !== packageName)
	}

	return pkgs
}

/*
 * Alter scripts accordingly
 * @param {object} scripts The npm scripts
 * @param {object} packageJson The json obj of package.json
 * @return {array} The altered json file
 */
const alterScripts = (scripts, packageJson) => {
	const pkgScripts = Object.assign({}, scripts, packageJson['scripts'] || {})

	packageJson['scripts'] = Object.assign({}, pkgScripts)

	return packageJson
}

/*
 * yarn add eslint husky lint-staged vuepress -D, accordingly
 * @param {object} The json object of `package.json`
 * @return {object} The json object of `package.json`
 */
const yarnAddDev = (packageJson) => {
	let pkgs = ['eslint', 'husky', 'lint-staged', 'vuepress']

	pkgs = alterPkgs(pkgs, packageJson, 'eslint')
	pkgs = alterPkgs(pkgs, packageJson, 'husky')
	pkgs = alterPkgs(pkgs, packageJson, 'lint-staged')
	pkgs = alterPkgs(pkgs, packageJson, 'vuepress')

	if(pkgs.length > 0) {
		execSync(`yarn add ${pkgs.join(' ')} -D`)
	}

	return packageJson
}

/*
 * yarn add puppeteer, accordingly
 * @param {object} packageJson The json object of `package.json`
 * @param {array} pkgs Additional packages such as puppeteer
 */
const yarnAdd = (packageJson, pkgs = []) => {
	let packages = [...pkgs]
	for(let pkg of pkgs) {
		packages = alterPkgs(packages, packageJson, pkg)
	}
	const cmd = `yarn add ${packages.join(' ')}`
	log(cmd)
	exec(cmd, { timeout: 60000 }, () => {
		log(`${pkgs.join(' ')} is installed.`)
	})
}

/*
 * Create .eslintrc.js from root if necessary
 */
const eslintInit = () => {
	createFile('.eslintrc.js')
}

/*
 * Alter package.json to implement husky and lint-staged
 * @param {object} packageJson The json object of `package.json`
 */
const lintPreCommit = (packageJson) => {
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

	return packageJson
}

/*
 * Create lib/util.js from template if necessary
 */
const utilInit = () => {
	createFile('util.js', 'lib')
}

module.exports = { eslintInit, lintPreCommit, utilInit, yarnAdd, yarnAddDev, yarnInit, readPackageJsonSync, writePackageJsonSync, alterScripts }
