const fs = require('fs')
const { askToRestart, getExtensionVersion } = require('./utils')
const {
	CSS_SELECTORS, 
	WORKBENCH_INDEX_FILE, 
	WORKBENCH_MAIN_JS_FILE
} = require('./constants')

/**
 * @param {vscode.ExtensionContext} context
 */
function enable(context) {
	patchFiles()
	context.globalState.update('extension.custom_pointer', 'enabled')
	askToRestart('Custom Pointer has been enabled, restart to apply changes!')
}

/**
 * @param {vscode.ExtensionContext} context
 */
function update(_context) {
	patchFiles()
	askToRestart('Custom Pointer has been updated, restart to apply changes!')
}

/**
 * @param {vscode.ExtensionContext} context
 */
function disable(context) {
	restoreFiles()
	context.globalState.update('extension.custom_pointer', 'disabled')
	askToRestart('Custom Pointer has been disabled, restart to apply changes!')
}

module.exports = {
	enable,
	update,
    disable,
}

// --

const patchFiles = () => {
	const version = getExtensionVersion()
	const styles = `<style>${CSS_SELECTORS.join(',')}{cursor:default !important;}</style>`
	let content = fs.readFileSync(WORKBENCH_INDEX_FILE, 'utf-8')
	content = content.replace(/<!-- CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END -->/, '')
	content = content.replace("</head>", `<!-- CUSTOM-POINTER_BEGIN [${version}] -->${styles}<!-- CUSTOM-POINTER_END --></head>`)
	fs.writeFileSync(WORKBENCH_INDEX_FILE, content, 'utf-8')

	content = fs.readFileSync(WORKBENCH_MAIN_JS_FILE, 'utf-8')
	content = content.replace("this.properties.isPure=i", "this.properties.isPure=1")
	fs.writeFileSync(WORKBENCH_MAIN_JS_FILE, content, 'utf-8')
}

const restoreFiles = () => {
	let content = fs.readFileSync(WORKBENCH_INDEX_FILE, 'utf-8')
	content = content.replace(/<!-- CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END -->/, '')
	fs.writeFileSync(WORKBENCH_INDEX_FILE, content, 'utf-8')

	content = fs.readFileSync(WORKBENCH_MAIN_JS_FILE, 'utf-8')
	content = content.replace("this.properties.isPure=1", "this.properties.isPure=i")
	fs.writeFileSync(WORKBENCH_MAIN_JS_FILE, content, 'utf-8')
}
