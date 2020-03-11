let args = process.argv

/*
 * parse arguments from command line
 * @return {string} Type of NodeJS: puppeteer/puppeteer-core
 */
const getType = () => {
	// puppeteer / puppeteer-core
	let regEx = /(?: --type | -t) (puppeteer(-core)?)/

	let matchResult = args.join(' ').match(regEx)
	if(matchResult) {
		return matchResult[1]
	}

	return null
}

module.exports = { getType }
