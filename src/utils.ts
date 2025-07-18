import * as vscode from 'vscode'
import { readFileSync, writeFileSync } from 'fs'
import { CSS_SELECTORS, EXTENSION_VERSION, WORKBENCH_MAIN_CSS_FILE } from './constants'

/**
 * Gets the active version of the extension from the workbench main CSS file.
 *
 * @returns The active version. If the version is not found in the CSS file, returns null.
 */
export function getActiveVersion(): string|null {
	const mainCssFile = readFileSync( WORKBENCH_MAIN_CSS_FILE, 'utf-8' )
	const match = mainCssFile.match( /\/\*CUSTOM-POINTER_BEGIN \[(.*?)\]\*\// )
	return match ? match[1] : null
}

/**
 * Shows a restart notice to the user with a message and a button to restart the window.
 *
 * @param messsage The message to show in the information dialog.
 */
export function showRestartNotice( messsage: string ): void {
	vscode.window
		.showInformationMessage(
			messsage,
			{ title: 'Restart' }
		)
		.then( () =>
			vscode.commands.executeCommand( 'workbench.action.reloadWindow' )
		)
}

/**
 * Patches the workbench main CSS file to include custom pointer styles.
 * This is called when the extension is enabled or updated.
 */
export function injectExtensionCustomCode() {
	let content = readFileSync( WORKBENCH_MAIN_CSS_FILE, 'utf-8' )
	content = content.replace( /\/\*CUSTOM-POINTER_BEGIN .*? \/\*CUSTOM-POINTER_END\*\//, '' )
	content += `/*CUSTOM-POINTER_BEGIN [${EXTENSION_VERSION}]*/ ${CSS_SELECTORS.join(',')}{cursor:default !important;} /*CUSTOM-POINTER_END*/`
	writeFileSync( WORKBENCH_MAIN_CSS_FILE, content, 'utf-8' )
}

/**
 * Restores the original state of the workbench main CSS file by removing the custom pointer styles.
 * This is called when the extension is disabled or uninstalled.
 */
export function removeExtensionCustomCode() {
	let content = readFileSync( WORKBENCH_MAIN_CSS_FILE, 'utf-8' )
	content = content.replace( /\/\*CUSTOM-POINTER_BEGIN .*? \/\*CUSTOM-POINTER_END\*\//, '' )
	writeFileSync( WORKBENCH_MAIN_CSS_FILE, content, 'utf-8' )
}
