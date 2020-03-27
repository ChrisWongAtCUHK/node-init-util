const fs = require('fs')
const { execSync } = require('child_process')
const { createFile } = require('@lib/fs-util')
const { log } = require('@lib/util')

const gitInitMessages = {
	exists: 'It is git repository already.',
	default: 'A git repository is initialized.'
}

/*
 * if .git not exist, git init
 */
const gitInit = () => {
	if(fs.existsSync('./.git')) {
		log(gitInitMessages.exists)
	} else {
		execSync('git init')
		log(gitInitMessages.default)
	}
}


/*
 * Create .gitignore from template if necessary
 */
const gitIgnore = () => {
	createFile('.gitignore')
}

module.exports = { gitIgnore, gitInit, gitInitMessages }
