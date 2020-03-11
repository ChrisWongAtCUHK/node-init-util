#!/usr/bin/env node
const { getType } = require('./lib/cli-helper.js')
const { eslintInit, lintPreCommit, utilInit, yarnAdd, yarnAddDev, yarnInit } = require('./lib/npm-helper.js')
const { gitIgnore, gitInit } = require('./lib/git-helper.js')
const { createESLint, createMain } = require('./lib/fs-util.js')

const type = getType()

gitInit()
gitIgnore()
yarnInit()
const packageJson = yarnAddDev()

if(type === 'puppeteer') {
	yarnAdd(packageJson, [type])
	createESLint(type)
	createMain(type)
} else {
	eslintInit(type)
}

// default no type
lintPreCommit()
utilInit()
