import * as vscode from 'vscode'
import { EXTENSION_VERSION } from './constants'
import {
	getActiveVersion,
	injectExtensionCustomCode,
	removeExtensionCustomCode,
	showRestartNotice
} from './utils'


export function activate( context: vscode.ExtensionContext ) {
	const enabled = context.globalState.get( 'extension.custom-pointer.enabled', true )

	console.log( `Extension "Custom Pointer" is now active [ enabled=${enabled}, version=${EXTENSION_VERSION}, active_version=${getActiveVersion()} ]` )

	const activeVersion = getActiveVersion()

	if ( enabled && EXTENSION_VERSION !== activeVersion ) {
		injectExtensionCustomCode()
		showRestartNotice( `Custom Pointer has been ${activeVersion ? 'updated' : 'enabled'}, restart to apply changes!` )
	}

	const enable = vscode.commands.registerCommand( 'extension.custom-pointer.enable', () => {
		injectExtensionCustomCode()
		context.globalState.update( 'extension.custom-pointer.enabled', true )
		showRestartNotice( 'Custom Pointer has been enabled, restart to apply changes!' )
	} );
	context.subscriptions.push( enable );

	const disable = vscode.commands.registerCommand( 'extension.custom-pointer.disable', () => {
		removeExtensionCustomCode()
		context.globalState.update( 'extension.custom-pointer.enabled', false )
		showRestartNotice( 'Custom Pointer has been disabled, restart to apply changes!' )
	} );
	context.subscriptions.push( disable );
}


export function deactivate() {
}
