const { log } = require('./util')
const fs = require('fs')

/*
 * Create file from template if necessary
 *	1. .gitignore
 *	2. .eslintrc.js
 *	3. lib/util.js
 * @param {string} filename File name
 * @param {string} dir Folder name, default is root path of this project
 */
const createFile = (filename, dir = '') => {
	let srcDir = `${__dirname}/..`
	let dest = filename

	// util.js + lib -> lit/util.js
	if(dir.length > 0) {
		srcDir = `${srcDir}/${dir}`
		dest = `${dir}/${filename}`
	}

	if(fs.existsSync(dest)) {
		log(`${dest} exists.`)
	} else {
		if(dir.length > 0) {
			fs.mkdirSync(dir, { recursive: true })
		}
		const path = fs.readFileSync(`${srcDir}/${filename}`)
		fs.writeFileSync(dest, path)

		log(`${dest} is created.`)
	}
}

module.exports = { createFile }

