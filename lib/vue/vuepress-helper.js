const { readPackageJsonSync, alterScripts } = require('../npm-helper')

const SCRIPTS = {
	'docs:dev'  : 'vuepress dev docs',
	'docs:build': 'vuepress build docs'
}

/*
 * Add or alter scripts for VuePress
 * @return {object} packageJson The json obj of package.json
 * */
const setVuePressScripts = () => {
	return alterScripts(SCRIPTS, readPackageJsonSync())
}

module.exports = { SCRIPTS, setVuePressScripts }
