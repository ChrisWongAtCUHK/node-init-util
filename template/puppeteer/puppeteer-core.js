const { spawn } = require('child_process')
const puppeteer = require('puppeteer-core')
const { error } = require('./lib/util')

// the executable path of Google Chrome
const executablePath = ''
const which = spawn('which', [executablePath])
let canRun = false

which.stdout.on('data', (data) => {
	canRun = data ? true : false
})

which.stderr.on('data', (data) => {
	error(`stderr: ${data}`)
})

which.on('close', () => {
	if(canRun) {
		(async () => {
			const browser = await puppeteer.launch({
				executablePath: executablePath
			})
			const page = await browser.newPage()
			await page.goto('https://www.npmjs.com/package/puppeteer-core')
			await page.screenshot({path: 'puppeteer-core.png'})

			await browser.close()
		})()
	} else {
		error(`${executablePath} is not valid Google Chrome path.`)
	}
})
