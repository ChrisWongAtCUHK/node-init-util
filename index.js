#!/usr/bin/env node
require('module-alias/register')
const { getType } = require('@lib/cli-helper')
const { eslintInit, lintPreCommit, utilInit, yarnAdd, yarnAddDev, yarnInit, readPackageJsonSync, writePackageJsonSync } = require('@lib/npm-helper')
const { gitIgnore, gitInit } = require('@lib/git-helper')
const { createESLint, createMain } = require('@lib/fs-util')
const { setVuePressScripts, copyDocs } = require('@lib/vue/vuepress-helper')

const type = getType()

gitInit()
gitIgnore()
yarnInit()
let packageJson = yarnAddDev(readPackageJsonSync())

switch(type) {
	case 'puppeteer':
		yarnAdd(packageJson, [type])
		createESLint('puppeteer')
		createMain(type)
		break
	case 'puppeteer-core':
		yarnAdd(packageJson, [type])
		createESLint('puppeteer')
		createMain('puppeteer', 'puppeteer-core.js')
		break
	default:
		eslintInit()
		break
}

// default no type
packageJson = lintPreCommit(readPackageJsonSync())

// VuePress
packageJson = setVuePressScripts(packageJson)
copyDocs()

writePackageJsonSync(packageJson)
utilInit()
