const fs = require('fs')
const path = require('path')
const { log } = require('@lib/util')
const ROOT = '..'		// same directory of package.json
/*
 * Create file from template if necessary
 *	1. .gitignore
 *	2. .eslintrc.js
 *	3. lib/util.js
 * @param {string} filename File name
 * @param {string} dir Folder name, default is root path of this project
 */
const createFile = (filename, dir = '') => {
	let srcDir = path.resolve(__dirname, ROOT)
	let dest = filename

	// util.js + lib -> lib/util.js
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
	let src = path.resolve(__dirname, `${ROOT}/template`, `${type}/${filename}`)
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
 * @param {string} filename File name: 'index.js', 'puppeteer-core.js'
 */
const createMain = (type, filename = 'index.js') => {
	createTemplate(type, filename)
}

/*
 * Simulate cp -R
 * @param {string} src The path to the thing to copy
 * @param {string} src The path to the thing to the new copy
 */
const copyRecuriveSync = (src, dest) => {
	const exists = fs.existsSync(src)
	const stats = exists && fs.statSync(src)
	const isDirectory = exists && stats.isDirectory()

	if(isDirectory) {
		fs.mkdirSync(dest)
		fs.readdirSync(src).forEach((child) => {
			copyRecuriveSync(path.join(src, child), path.join(dest, child))
		})
	} else {
		fs.copyFileSync(src, dest)
	}
}

/*
 * Recursive create folders and files
 * @param {string} foldName Folder name: e.g. docs
 */
const copyFolder = (folderName) => {
	let src = path.resolve(__dirname, ROOT, folderName)
	let dest = folderName

	if(fs.existsSync(dest)) {
		log(`${dest} exists.`)
	} else {
		copyRecuriveSync(src, dest)
	}
}

module.exports = { createESLint, createFile, createMain, copyFolder }

