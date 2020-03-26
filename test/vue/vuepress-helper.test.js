require('chai').should()
const { expect } = require('chai')
const { setVuePressScripts, copyDocs } = require('@lib/vue/vuepress-helper')

describe('VuePress', () => {
	it('should get the equivalent object', () => {
		const scripts = setVuePressScripts()['scripts']
		expect(Object.keys(scripts).length).to.at.least(2)
	})

	it('should have `docs` directory', () => {
		copyDocs()
	})
})
