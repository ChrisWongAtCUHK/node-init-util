const { readPackageJsonSync, alterScripts } = require('../npm-helper')
const { copyFolder } = require('../fs-util')
const SCRIPTS = {
	'docs:dev'  : 'vuepress dev docs',
	'docs:build': 'vuepress build docs'
}

/*
 * Add or alter scripts for VuePress
 * @param {object} packageJson The json object of `package.json`
 * @return {object} packageJson The altered json object
 */
const setVuePressScripts = (packageJson = null) => {
	const json = packageJson || readPackageJsonSync()

	return alterScripts(SCRIPTS, json)
}

/*
 * Copy VuePress docs folder
 */
const copyDocs = () => {
	copyFolder('docs')
}

module.exports = { setVuePressScripts, copyDocs }
