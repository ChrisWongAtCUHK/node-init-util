const fs = require('fs')
const { execSync } = require('child_process')
const { createFile } = require('./fs-util')
const { log } = require('./util')

/*
 * if .git not exist, git init
 */
const gitInit = () => {
	if(fs.existsSync('./.git')) {
		log('It is git repository already.')
	} else {
		execSync('git init')
		log('A git repository is initialized.')
	}
}


/*
 * Create .gitignore from template if necessary
 */
const gitIgnore = () => {
	createFile('.gitignore')
}

module.exports = { gitIgnore, gitInit }
