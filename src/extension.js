const vscode = require('vscode')
const { enable, update, disable } = require('./commands')
const { getActiveVersion, getExtensionVersion } = require('./utils')

// Define a handler for any uncaught exception
process.on('uncaughtException', handleUncaughtException)

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const status = context.globalState.get('extension.custom_pointer', '')
	if (status === '') {
		// First time the extension is activated
		enable(context)
	
	} else if (status === 'enabled' && getActiveVersion() !== getExtensionVersion()) {
		// The extension has been updated
		update(context)
	}

	context.subscriptions.push(vscode.commands.registerCommand('extension.custom_pointer.enable', function() { enable(context) }))
	context.subscriptions.push(vscode.commands.registerCommand('extension.custom_pointer.disable', function() { disable(context) }))
}

function onDidChange(event) {
	console.log(':: > onDidChange')
	console.log(event);
}

function deactivate() {
	console.log(':: > deactivate')
}

module.exports = {
	activate,
	deactivate,
	onDidChange
}

// --

function handleUncaughtException(err) {
	console.log(`:: ${err}`)
	if (!/ENOENT|EACCES|EPERM/.test(err.code)) {
		console.log('[Custom Pointer] >', 'uncaughtException')
		return
	}
	// If and exception is thrown, ask for Visual Studio Core to be run with admin privileges
	vscode.window.showInformationMessage('Run Visual Studio Code with admin privileges so the changes can be applied')
}
