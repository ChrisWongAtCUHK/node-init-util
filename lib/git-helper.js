const fs = require('fs')
const { execSync } = require('child_process')
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
 * if .gitignore not exist, create
 */
const gitIgnore = () => {
	if(fs.existsSync('./.gitignore')) {
		log('.gitignore exists.')
	} else {
		const ignore = fs.readFileSync(`${__dirname}/../.gitignore`)
		fs.writeFileSync('.gitignore', ignore)
		log('.gitignore is created.')
	}
}

module.exports = { gitIgnore, gitInit }
