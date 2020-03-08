#!/usr/bin/env node
const { yarnInit } = require('./lib/npm-helper.js')
const { gitInit } = require('./lib/git-helper.js')

yarnInit()
gitInit()
