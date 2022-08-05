const fs = require( 'fs' )
const {
	askToRestart,
	getExtensionVersion
} = require( './utils' )
const {
	CSS_SELECTORS,
	WORKBENCH_MAIN_CSS_FILE
} = require( './constants' )

function enable( context ) {
	patchFiles()
	context.globalState.update( 'extension.custom_pointer', 'enabled' )
	askToRestart( 'Custom Pointer has been enabled, restart to apply changes!' )
}

function update( _context ) {
	patchFiles()
	askToRestart( 'Custom Pointer has been updated, restart to apply changes!' )
}

function disable( context ) {
	restoreFiles()
	context.globalState.update( 'extension.custom_pointer', 'disabled' )
	askToRestart( 'Custom Pointer has been disabled, restart to apply changes!' )
}

module.exports = {
	enable,
	update,
    disable,
}

// --

const patchFiles = () => {
	const version = getExtensionVersion()
	let content = fs.readFileSync(WORKBENCH_MAIN_CSS_FILE, 'utf-8')
	content = content.replace(/\/\*CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END\*\//, '')
	content += `/*CUSTOM-POINTER_BEGIN [${version}]*/ ${CSS_SELECTORS.join(',')}{cursor:default !important;} /*CUSTOM-POINTER_END*/`
	fs.writeFileSync(WORKBENCH_MAIN_CSS_FILE, content, 'utf-8')
}

const restoreFiles = () => {
	let content = fs.readFileSync(WORKBENCH_MAIN_CSS_FILE, 'utf-8')
	content = content.replace(/\/\*CUSTOM-POINTER_BEGIN .*? \/\*CUSTOM-POINTER_END\*\//, '')
	fs.writeFileSync(WORKBENCH_MAIN_CSS_FILE, content, 'utf-8')
}
