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
		const content = fs.readFileSync(`${srcDir}/${filename}`)
		fs.writeFileSync(dest, content)

		log(`${dest} is created.`)
	}
}

/*
 * Create files from template directory
 * @param {string} type Type of project: 'puppeteer'
 * @param {string} filename File name: '.eslintrc.js', 'index.js'
 */
const createTemplate = (type, filename) => {
	let src = `${__dirname}/../template/${type}/${filename}`
	let dest = filename

	if(fs.existsSync(dest)) {
		log(`${dest} exists.`)
	} else {
		const content = fs.readFileSync(src)
		fs.writeFileSync(dest, content)
		log(`${dest} is created.`)
	}
}


/*
 * Create .eslintrc.js from template directory
 * @param {string} type Type of project: 'puppeteer'
 */
const createESLint = (type) => {
	createTemplate(type, '.eslintrc.js')
}

/*
 * Create .index.js from template directory
 * @param {string} type Type of project: 'puppeteer'
 */
const createMain = (type) => {
	createTemplate(type, 'index.js')
}

module.exports = { createESLint, createFile, createMain }

