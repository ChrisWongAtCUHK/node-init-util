#!/usr/bin/env node
const { yarnAdd, yarnInit } = require('./lib/npm-helper.js')
const { gitIgnore, gitInit } = require('./lib/git-helper.js')

yarnInit()
gitInit()
gitIgnore()
yarnAdd()
